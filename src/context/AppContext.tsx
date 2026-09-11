import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { demoOrders, type Order, type OrderStatus } from "@/data/demo";

export type CartItem = {
  id: string;
  name: string;
  vendor: string;
  price: number;
  unit: string;
  qty: number;
  kind: "seed" | "equipment" | "worker";
};

export type DemoUser = {
  name: string;
  mobile: string;
  email: string;
  village: string;
  isDemo: boolean;
};

type AppState = {
  user: DemoUser | null;
  login: (user: DemoUser) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  orders: Order[];
  placeOrder: (payment: string) => string;
};

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "kisansetu-demo-state";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(demoOrders);

  // Read persisted demo state only after hydration.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        user?: DemoUser | null;
        cart?: CartItem[];
        orders?: Order[];
      };
      if (parsed.user) setUser(parsed.user);
      if (parsed.cart) setCart(parsed.cart);
      if (parsed.orders?.length) setOrders(parsed.orders);
    } catch {
      /* ignore corrupt demo state */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, cart, orders }));
    } catch {
      /* storage unavailable */
    }
  }, [user, cart, orders]);

  const addToCart = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + qty } : c));
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev.flatMap((c) => (c.id === id ? (qty <= 0 ? [] : [{ ...c, qty }]) : [c])),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.price * c.qty, 0), [cart]);
  const discount = useMemo(() => Math.round(subtotal * 0.15), [subtotal]);
  const total = Math.max(0, subtotal - discount);
  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);

  const placeOrder = useCallback(
    (payment: string) => {
      const id = `KS-${9100 + Math.floor(Math.random() * 800)}`;
      const first = cart[0];
      const label = first
        ? `${first.name}${cart.length > 1 ? ` +${cart.length - 1} more` : ""}`
        : "Demo order";
      const order: Order = {
        id,
        product: `${label} (${payment})`,
        vendor: first?.vendor ?? "KisanSetu Demo Vendor",
        date: new Date().toISOString().slice(0, 10),
        amount: total,
        status: "Order Placed" as OrderStatus,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return id;
    },
    [cart, total],
  );

  const login = useCallback((u: DemoUser) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);

  const value: AppState = {
    user,
    login,
    logout,
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
    discount,
    total,
    orders,
    placeOrder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
