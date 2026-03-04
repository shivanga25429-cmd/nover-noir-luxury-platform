import { fetchProducts, ProductDB } from '@/lib/supabase';

export interface Review {
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  description: string;
  fragranceFamily: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  reviews: Review[];
}

// Local reviews data (not stored in DB for now)
const productReviews: Record<string, Review[]> = {
  "Noir-Vanile": [
    { name: "Divya L.", rating: 5, comment: "Smells expensive. Can't believe the price." },
  ],
  "midnight-rush": [
    { name: "Arjun M.", rating: 5, comment: "Absolutely incredible. Lasts all day and gets compliments everywhere." },
    { name: "Priya S.", rating: 4, comment: "Rich and sophisticated. Perfect for evening wear." },
  ],
  "onyx-bloom": [
    { name: "Sneha R.", rating: 5, comment: "This is my signature scent now. Elegant and long-lasting." },
    { name: "Karan D.", rating: 5, comment: "Gifted this to my partner. She absolutely loves it." },
  ],
  "crown-elixir": [
    { name: "Rohan K.", rating: 5, comment: "Premium quality at this price is unbelievable. My go-to fragrance." },
    { name: "Ananya P.", rating: 4, comment: "Warm and inviting. Perfect for winter evenings." },
  ],
  "midnight-veil": [
    { name: "Vikram S.", rating: 5, comment: "Fresh yet deep. Perfect for daily wear." },
    { name: "Meera J.", rating: 4, comment: "Love the citrus opening. Great summer fragrance." },
  ],
  "oud-sovereign": [
    { name: "Rahul T.", rating: 5, comment: "This is the best oud fragrance I've ever tried at any price point." },
    { name: "Aisha N.", rating: 5, comment: "Royalty in a bottle. Worth every rupee." },
  ],
};

// Convert DB product to frontend Product format
function mapProductFromDB(dbProduct: ProductDB): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price ?? null,
    image: dbProduct.image || '',
    description: dbProduct.description || '',
    fragranceFamily: dbProduct.fragrance_family || '',
    topNotes: dbProduct.top_notes || [],
    middleNotes: dbProduct.middle_notes || [],
    baseNotes: dbProduct.base_notes || [],
    reviews: productReviews[dbProduct.id] || [],
  };
}

// Fetch products from Supabase
export async function getProducts(): Promise<Product[]> {
  const dbProducts = await fetchProducts();
  return dbProducts.map(mapProductFromDB);
}

// Fallback products array (kept for backwards compatibility during migration)
export const products: Product[] = [];

export const testimonials = [
  { name: "Arjun M.", rating: 5, comment: "NOVER NOIR redefined luxury for me. Incredible quality at an unbeatable price." },
  { name: "Sneha R.", rating: 5, comment: "I've tried international brands that cost 10x more and NOVER NOIR holds its own. Truly premium." },
  { name: "Karan D.", rating: 5, comment: "The packaging alone feels like you're unboxing something from Paris. The scent? Even better." },
  { name: "Priya S.", rating: 4, comment: "Long-lasting, elegant, and affordable. What more could you ask for?" },
];
