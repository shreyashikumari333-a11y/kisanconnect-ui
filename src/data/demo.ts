// DEMO DATA — all records below are fictional, created for a college mini-project
// prototype. Nothing here is connected to real vendors, schemes or services.

export type Seed = {
  id: string;
  name: string;
  crop: string;
  season: string;
  soil: string[];
  price: number;
  unit: string;
  availability: "In Stock" | "Low Stock" | "Out of Stock";
  score: number;
  vendor: string;
  rating: number;
  category: string;
  duration: string;
  water: string;
};

export const crops = ["Wheat", "Rice", "Maize", "Mustard", "Tomato", "Potato"] as const;
export const soilTypes = ["Loamy", "Clay", "Sandy", "Black", "Alluvial", "Red"] as const;
export const seasons = ["Kharif", "Rabi", "Zaid", "All Season"] as const;
export const waterLevels = ["Rainfed", "Limited", "Moderate", "Abundant"] as const;
export const districts = [
  "Nashik, Maharashtra",
  "Ludhiana, Punjab",
  "Patna, Bihar",
  "Indore, Madhya Pradesh",
  "Mysuru, Karnataka",
  "Varanasi, Uttar Pradesh",
] as const;

export const seedCatalog: Seed[] = [
  {
    id: "SD-101",
    name: "Sona Gold Wheat HD-2967",
    crop: "Wheat",
    season: "Rabi",
    soil: ["Loamy", "Alluvial"],
    price: 420,
    unit: "10 kg bag",
    availability: "In Stock",
    score: 94,
    vendor: "Haryali Seed Bhandar",
    rating: 4.6,
    category: "Cereal",
    duration: "125 days",
    water: "Moderate",
  },
  {
    id: "SD-102",
    name: "Basmati Pusa 1121 Paddy",
    crop: "Rice",
    season: "Kharif",
    soil: ["Clay", "Alluvial"],
    price: 560,
    unit: "10 kg bag",
    availability: "In Stock",
    score: 91,
    vendor: "Krishi Mitra Traders",
    rating: 4.4,
    category: "Cereal",
    duration: "140 days",
    water: "Abundant",
  },
  {
    id: "SD-103",
    name: "Shakti Hybrid Maize M-55",
    crop: "Maize",
    season: "Kharif",
    soil: ["Loamy", "Red", "Sandy"],
    price: 380,
    unit: "5 kg pack",
    availability: "Low Stock",
    score: 88,
    vendor: "Green Field Agro",
    rating: 4.2,
    category: "Cereal",
    duration: "100 days",
    water: "Limited",
  },
  {
    id: "SD-104",
    name: "Pusa Bold Mustard",
    crop: "Mustard",
    season: "Rabi",
    soil: ["Sandy", "Loamy"],
    price: 240,
    unit: "2 kg pack",
    availability: "In Stock",
    score: 86,
    vendor: "Haryali Seed Bhandar",
    rating: 4.5,
    category: "Oilseed",
    duration: "110 days",
    water: "Limited",
  },
  {
    id: "SD-105",
    name: "Lal Rani Hybrid Tomato",
    crop: "Tomato",
    season: "All Season",
    soil: ["Loamy", "Red", "Black"],
    price: 310,
    unit: "10 g sachet",
    availability: "In Stock",
    score: 90,
    vendor: "Sabzi Beej Kendra",
    rating: 4.7,
    category: "Vegetable",
    duration: "75 days",
    water: "Moderate",
  },
  {
    id: "SD-106",
    name: "Kufri Jyoti Potato Tuber",
    crop: "Potato",
    season: "Rabi",
    soil: ["Sandy", "Loamy", "Alluvial"],
    price: 690,
    unit: "25 kg sack",
    availability: "Low Stock",
    score: 84,
    vendor: "Krishi Mitra Traders",
    rating: 4.1,
    category: "Vegetable",
    duration: "95 days",
    water: "Moderate",
  },
  {
    id: "SD-107",
    name: "Swarna Sub-1 Flood Tolerant Paddy",
    crop: "Rice",
    season: "Kharif",
    soil: ["Clay", "Alluvial"],
    price: 480,
    unit: "10 kg bag",
    availability: "In Stock",
    score: 89,
    vendor: "Green Field Agro",
    rating: 4.3,
    category: "Cereal",
    duration: "150 days",
    water: "Abundant",
  },
  {
    id: "SD-108",
    name: "Raj Wheat 4238 Drought Ready",
    crop: "Wheat",
    season: "Rabi",
    soil: ["Black", "Loamy"],
    price: 395,
    unit: "10 kg bag",
    availability: "In Stock",
    score: 87,
    vendor: "Sabzi Beej Kendra",
    rating: 4.0,
    category: "Cereal",
    duration: "118 days",
    water: "Rainfed",
  },
  {
    id: "SD-109",
    name: "Ganga Safed Maize Composite",
    crop: "Maize",
    season: "Zaid",
    soil: ["Alluvial", "Loamy"],
    price: 265,
    unit: "5 kg pack",
    availability: "Out of Stock",
    score: 79,
    vendor: "Krishi Mitra Traders",
    rating: 3.9,
    category: "Cereal",
    duration: "90 days",
    water: "Moderate",
  },
  {
    id: "SD-110",
    name: "Anmol Tomato Desi Selection",
    crop: "Tomato",
    season: "Rabi",
    soil: ["Black", "Loamy"],
    price: 180,
    unit: "10 g sachet",
    availability: "In Stock",
    score: 82,
    vendor: "Haryali Seed Bhandar",
    rating: 4.2,
    category: "Vegetable",
    duration: "80 days",
    water: "Limited",
  },
  {
    id: "SD-111",
    name: "Varuna Mustard Oilseed",
    crop: "Mustard",
    season: "Rabi",
    soil: ["Loamy", "Red"],
    price: 210,
    unit: "2 kg pack",
    availability: "In Stock",
    score: 81,
    vendor: "Green Field Agro",
    rating: 4.0,
    category: "Oilseed",
    duration: "115 days",
    water: "Rainfed",
  },
  {
    id: "SD-112",
    name: "Chipsona Potato Seed",
    crop: "Potato",
    season: "Rabi",
    soil: ["Sandy", "Alluvial"],
    price: 750,
    unit: "25 kg sack",
    availability: "In Stock",
    score: 83,
    vendor: "Sabzi Beej Kendra",
    rating: 4.4,
    category: "Vegetable",
    duration: "100 days",
    water: "Moderate",
  },
];

export const vendors = [
  "Haryali Seed Bhandar",
  "Krishi Mitra Traders",
  "Green Field Agro",
  "Sabzi Beej Kendra",
];

export const seedCategories = ["Cereal", "Oilseed", "Vegetable"];

export type Equipment = {
  id: string;
  name: string;
  type: string;
  provider: string;
  pricePerDay: number;
  location: string;
  available: boolean;
  rating: number;
  note: string;
};

export const equipmentList: Equipment[] = [
  {
    id: "EQ-201",
    name: "Mahindra 475 DI Tractor",
    type: "Tractor",
    provider: "Patil Farm Services",
    pricePerDay: 1800,
    location: "Nashik, Maharashtra",
    available: true,
    rating: 4.6,
    note: "42 HP, with cultivator attachment",
  },
  {
    id: "EQ-202",
    name: "Kisan Power Tiller 12HP",
    type: "Power Tiller",
    provider: "Balaji Agro Rentals",
    pricePerDay: 750,
    location: "Indore, Madhya Pradesh",
    available: true,
    rating: 4.3,
    note: "Ideal for small plots under 2 acres",
  },
  {
    id: "EQ-203",
    name: "Diesel Water Pump 5HP",
    type: "Water Pump",
    provider: "Jal Dhara Services",
    pricePerDay: 320,
    location: "Patna, Bihar",
    available: true,
    rating: 4.1,
    note: "Includes 30 ft suction pipe",
  },
  {
    id: "EQ-204",
    name: "Battery Knapsack Sprayer",
    type: "Sprayer",
    provider: "Green Field Agro",
    pricePerDay: 150,
    location: "Ludhiana, Punjab",
    available: false,
    rating: 4.0,
    note: "16 litre tank, 8 hour battery",
  },
  {
    id: "EQ-205",
    name: "Mini Combine Harvester",
    type: "Harvester",
    provider: "Sardar Harvest Co.",
    pricePerDay: 4200,
    location: "Ludhiana, Punjab",
    available: true,
    rating: 4.8,
    note: "Operator included in demo rate",
  },
  {
    id: "EQ-206",
    name: "Rotavator 5 Feet",
    type: "Tractor",
    provider: "Patil Farm Services",
    pricePerDay: 900,
    location: "Nashik, Maharashtra",
    available: true,
    rating: 4.2,
    note: "Tractor mounted, 42 blades",
  },
  {
    id: "EQ-207",
    name: "Solar Submersible Pump",
    type: "Water Pump",
    provider: "Surya Krishi Yantra",
    pricePerDay: 420,
    location: "Mysuru, Karnataka",
    available: true,
    rating: 4.5,
    note: "No fuel cost, 3 HP output",
  },
  {
    id: "EQ-208",
    name: "Boom Sprayer Trolley",
    type: "Sprayer",
    provider: "Balaji Agro Rentals",
    pricePerDay: 640,
    location: "Varanasi, Uttar Pradesh",
    available: true,
    rating: 3.9,
    note: "Covers 4 acres per day",
  },
];

export const equipmentTypes = ["Tractor", "Power Tiller", "Water Pump", "Sprayer", "Harvester"];

export type Worker = {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  location: string;
  wage: number;
  available: boolean;
  languages: string;
};

export const workerSkills = [
  "Harvesting",
  "Sowing",
  "Irrigation",
  "Crop Maintenance",
  "Equipment Handling",
];

export const workers: Worker[] = [
  {
    id: "WK-301",
    name: "Ramesh Yadav",
    skills: ["Harvesting", "Sowing"],
    experience: 12,
    location: "Varanasi, Uttar Pradesh",
    wage: 450,
    available: true,
    languages: "Hindi, Bhojpuri",
  },
  {
    id: "WK-302",
    name: "Sunita Devi",
    skills: ["Sowing", "Crop Maintenance"],
    experience: 8,
    location: "Patna, Bihar",
    wage: 400,
    available: true,
    languages: "Hindi",
  },
  {
    id: "WK-303",
    name: "Gurpreet Singh",
    skills: ["Equipment Handling", "Harvesting"],
    experience: 15,
    location: "Ludhiana, Punjab",
    wage: 700,
    available: false,
    languages: "Punjabi, Hindi",
  },
  {
    id: "WK-304",
    name: "Lakshmi Naik",
    skills: ["Irrigation", "Crop Maintenance"],
    experience: 6,
    location: "Mysuru, Karnataka",
    wage: 420,
    available: true,
    languages: "Kannada",
  },
  {
    id: "WK-305",
    name: "Ankit Patil",
    skills: ["Equipment Handling", "Irrigation"],
    experience: 9,
    location: "Nashik, Maharashtra",
    wage: 600,
    available: true,
    languages: "Marathi, Hindi",
  },
  {
    id: "WK-306",
    name: "Meena Kumari",
    skills: ["Harvesting", "Crop Maintenance"],
    experience: 4,
    location: "Indore, Madhya Pradesh",
    wage: 380,
    available: true,
    languages: "Hindi",
  },
  {
    id: "WK-307",
    name: "Shyam Lal",
    skills: ["Sowing", "Irrigation", "Harvesting"],
    experience: 20,
    location: "Varanasi, Uttar Pradesh",
    wage: 520,
    available: false,
    languages: "Hindi",
  },
  {
    id: "WK-308",
    name: "Priya Rathore",
    skills: ["Crop Maintenance", "Sowing"],
    experience: 5,
    location: "Indore, Madhya Pradesh",
    wage: 390,
    available: true,
    languages: "Hindi, Malwi",
  },
];

export type Benefit = {
  id: string;
  name: string;
  discount: string;
  eligibility: string[];
  status: "Active – Demo" | "Prototype" | "Expiring – Demo";
  appliesTo: string;
};

export const benefits: Benefit[] = [
  {
    id: "BN-1",
    name: "Seed Purchase Discount – Demo",
    discount: "15% off",
    eligibility: ["Farm size under 5 acres", "Minimum demo cart of ₹500"],
    status: "Active – Demo",
    appliesTo: "Seed marketplace orders",
  },
  {
    id: "BN-2",
    name: "Equipment Rental Discount – Demo",
    discount: "10% off",
    eligibility: ["Registered demo farmer profile", "Rental of 2 days or more"],
    status: "Active – Demo",
    appliesTo: "Equipment rental requests",
  },
  {
    id: "BN-3",
    name: "Seasonal Farmer Benefit – Prototype",
    discount: "₹250 flat off",
    eligibility: ["Rabi season sowing", "One use per demo account"],
    status: "Prototype",
    appliesTo: "Any demo order",
  },
  {
    id: "BN-4",
    name: "Small Farm Support Discount – Demo",
    discount: "20% off",
    eligibility: ["Farm size under 2 acres", "Village profile completed"],
    status: "Expiring – Demo",
    appliesTo: "Seeds and worker requests",
  },
];

export type Order = {
  id: string;
  product: string;
  vendor: string;
  date: string;
  amount: number;
  status: OrderStatus;
};

export const orderStatuses = [
  "Order Placed",
  "Processing",
  "Ready",
  "Out for Demo Delivery",
  "Delivered",
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export const demoOrders: Order[] = [
  {
    id: "KS-9001",
    product: "Sona Gold Wheat HD-2967 × 2",
    vendor: "Haryali Seed Bhandar",
    date: "2026-09-02",
    amount: 840,
    status: "Delivered",
  },
  {
    id: "KS-9002",
    product: "Battery Knapsack Sprayer (3 days)",
    vendor: "Green Field Agro",
    date: "2026-09-05",
    amount: 450,
    status: "Out for Demo Delivery",
  },
  {
    id: "KS-9003",
    product: "Lal Rani Hybrid Tomato × 4",
    vendor: "Sabzi Beej Kendra",
    date: "2026-09-07",
    amount: 1240,
    status: "Ready",
  },
  {
    id: "KS-9004",
    product: "Kufri Jyoti Potato Tuber × 1",
    vendor: "Krishi Mitra Traders",
    date: "2026-09-09",
    amount: 690,
    status: "Processing",
  },
  {
    id: "KS-9005",
    product: "Worker request – Ramesh Yadav (2 days)",
    vendor: "KisanSetu Worker Connect",
    date: "2026-09-10",
    amount: 900,
    status: "Order Placed",
  },
];

export const notifications = [
  {
    id: "n1",
    title: "Your demo seed order has been updated",
    detail: "Order KS-9003 is now marked Ready at Sabzi Beej Kendra.",
    time: "2 hours ago",
    tone: "primary" as const,
  },
  {
    id: "n2",
    title: "New equipment available near your location",
    detail: "Mini Combine Harvester listed by Sardar Harvest Co. (demo listing).",
    time: "Yesterday",
    tone: "earth" as const,
  },
  {
    id: "n3",
    title: "New seasonal seed recommendation available",
    detail: "Rabi wheat varieties suited to loamy soil were added to your demo list.",
    time: "3 days ago",
    tone: "harvest" as const,
  },
];

// ---------- Analytics (demo data) ----------

export const popularCropsData = [
  { crop: "Wheat", orders: 182 },
  { crop: "Rice", orders: 164 },
  { crop: "Maize", orders: 121 },
  { crop: "Potato", orders: 98 },
  { crop: "Tomato", orders: 76 },
  { crop: "Mustard", orders: 54 },
];

export const seedCategoryData = [
  { name: "Cereal", value: 467 },
  { name: "Vegetable", value: 214 },
  { name: "Oilseed", value: 98 },
  { name: "Pulses", value: 63 },
];

export const monthlyOrdersData = [
  { month: "Apr", orders: 42, requests: 18 },
  { month: "May", orders: 58, requests: 24 },
  { month: "Jun", orders: 91, requests: 39 },
  { month: "Jul", orders: 120, requests: 47 },
  { month: "Aug", orders: 148, requests: 61 },
  { month: "Sep", orders: 176, requests: 72 },
];

export const farmerActivityData = [
  { week: "W1", active: 120 },
  { week: "W2", active: 168 },
  { week: "W3", active: 210 },
  { week: "W4", active: 264 },
  { week: "W5", active: 312 },
  { week: "W6", active: 386 },
];

export const vendorProducts = [
  { id: "SD-101", name: "Sona Gold Wheat HD-2967", stock: 42, price: 420, status: "Active" },
  { id: "SD-104", name: "Pusa Bold Mustard", stock: 18, price: 240, status: "Active" },
  { id: "SD-110", name: "Anmol Tomato Desi Selection", stock: 6, price: 180, status: "Low Stock" },
  { id: "SD-109", name: "Ganga Safed Maize Composite", stock: 0, price: 265, status: "Paused" },
];

export const vendorRequests = [
  { id: "RQ-51", farmer: "Sunita Devi", item: "Pusa Bold Mustard × 3", note: "Needs delivery by Friday" },
  { id: "RQ-52", farmer: "Ankit Patil", item: "Sona Gold Wheat × 5", note: "Asking for bulk demo rate" },
  { id: "RQ-53", farmer: "Meena Kumari", item: "Anmol Tomato × 2", note: "First time demo buyer" },
];

// ---------- Recommendation engine (demo scoring) ----------

export type RecommendationInput = {
  crop: string;
  soil: string;
  season: string;
  farmSize: string;
  water: string;
  location: string;
};

export function recommendSeeds(input: RecommendationInput): Seed[] {
  const scored = seedCatalog
    .filter((s) => s.crop === input.crop)
    .map((seed) => {
      let score = 55;
      if (seed.soil.includes(input.soil)) score += 20;
      if (seed.season === input.season || seed.season === "All Season") score += 15;
      if (seed.water === input.water) score += 10;
      if (seed.availability === "In Stock") score += 5;
      if (seed.availability === "Out of Stock") score -= 15;
      return { ...seed, score: Math.max(35, Math.min(98, score)) };
    })
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0) return scored;

  return seedCatalog
    .filter((s) => s.soil.includes(input.soil) || s.season === input.season)
    .slice(0, 3);
}
