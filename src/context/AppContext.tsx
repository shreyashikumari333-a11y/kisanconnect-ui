import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
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
  authLoading: boolean;
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
  placeOrder: (payment: string) => Promise<string>;
};

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "kisansetu-demo-state";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(demoOrders);

  // Restore cart and orders from local storage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) return;

      const parsed = JSON.parse(raw) as {
        cart?: CartItem[];
        orders?: Order[];
      };

      if (parsed.cart) {
        setCart(parsed.cart);
      }

      if (parsed.orders?.length) {
        setOrders(parsed.orders);
      }
    } catch {
      /* ignore corrupt demo state */
    }
  }, []);

  // Listen to Firebase authentication state.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "Farmer",
          mobile: firebaseUser.phoneNumber || "",
          email: firebaseUser.email || "",
          village: "Demo Village",
          isDemo: false,
        });
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // Save cart and orders locally.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          cart,
          orders,
        }),
      );
    } catch {
      /* storage unavailable */
    }
  }, [cart, orders]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((c) => c.id === item.id);

        if (existing) {
          return prev.map((c) =>
            c.id === item.id ? { ...c, qty: c.qty + qty } : c,
          );
        }

        return [...prev, { ...item, qty }];
      });
    },
    [],
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev.flatMap((c) =>
        c.id === id
          ? qty <= 0
            ? []
            : [{ ...c, qty }]
          : [c],
      ),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const subtotal = useMemo(
    () => cart.reduce((s, c) => s + c.price * c.qty, 0),
    [cart],
  );

  const discount = useMemo(
    () => Math.round(subtotal * 0.15),
    [subtotal],
  );

  const total = Math.max(0, subtotal - discount);

  const cartCount = useMemo(
    () => cart.reduce((s, c) => s + c.qty, 0),
    [cart],
  );

  const placeOrder = useCallback(
    async (payment: string) => {
      const id = `KS-${9100 + Math.floor(Math.random() * 800)}`;
      const first = cart[0];

      if (!first) {
        throw new Error("Cart is empty");
      }

      const orderItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        vendor: item.vendor,
        price: item.price,
        unit: item.unit,
        quantity: item.qty,
      }));

      const response = await fetch(
        "http://localhost:8000/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: orderItems,
            total: total,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      const label = `${first.name}${
        cart.length > 1 ? ` +${cart.length - 1} more` : ""
      }`;

      const order: Order = {
        id: data.order_id || id,
        product: `${label} (${payment})`,
        vendor: first.vendor,
        date: new Date().toISOString().slice(0, 10),
        amount: total,
        status: "Order Placed" as OrderStatus,
      };

      setOrders((prev) => [order, ...prev]);
      setCart([]);

      return order.id;
    },
    [cart, total],
  );

  const login = useCallback((u: DemoUser) => {
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    await auth.signOut();
    setUser(null);
  }, []);

  const value: AppState = {
    user,
    authLoading,
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

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return ctx;
}