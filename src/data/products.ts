export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  fragranceFamily: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  reviews: Review[];
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
}

export const products: Product[] = [
  {
    id: "Noir-Vanile",
    name: "Noir Vanile",
    price: 849,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=800&fit=crop",
    description: "Creamy sandalwood infused with golden honey and warm spices. A scent that wraps you in pure luxury.",
    fragranceFamily: "Woody",
    topNotes: ["Cinnamon", "Honey"],
    middleNotes: ["Sandalwood", "Iris"],
    baseNotes: ["Musk", "Amber", "Vanilla"],
    reviews: [
      { name: "Divya L.", rating: 5, comment: "Smells expensive. Can't believe the price." },
    ],
  },
  {
    id: "midnight-rush",
    name: "Midnight Rush",
    price: 899,
    image: "/vs.svg", //slash name likhna
    description: "A captivating blend of smoky oud and velvety amber, evoking the mystery of midnight. Bold yet refined, this scent lingers like a whispered secret.",
    fragranceFamily: "Papa",
    topNotes: ["Saffron", "Bergamot"],
    middleNotes: ["Oud", "Rose"],
    baseNotes: ["Amber", "Sandalwood", "Musk"],
    reviews: [
      { name: "Arjun M.", rating: 5, comment: "Absolutely incredible. Lasts all day and gets compliments everywhere." },
      { name: "Priya S.", rating: 4, comment: "Rich and sophisticated. Perfect for evening wear." },
    ],
  },
  {
    id: "onyx-bloom",
    name: "Onyx Bloom",
    price: 749,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&h=800&fit=crop",
    description: "An opulent bouquet of Damascena rose wrapped in warm vanilla and soft musk. Romantic, timeless, unforgettable.",
    fragranceFamily: "Floral",
    topNotes: ["Pink Pepper", "Lychee"],
    middleNotes: ["Damascena Rose", "Peony"],
    baseNotes: ["Vanilla", "White Musk", "Patchouli"],
    reviews: [
      { name: "Sneha R.", rating: 5, comment: "This is my signature scent now. Elegant and long-lasting." },
      { name: "Karan D.", rating: 5, comment: "Gifted this to my partner. She absolutely loves it." },
    ],
  },
  {
    id: "crown-elixir",
    name: "Crown Elixir",
    price: 999,
    image: "https://images.unsplash.com/photo-1594035910387-fbd1a485b12e?w=600&h=800&fit=crop",
    description: "Liquid gold in a bottle. Rich amber intertwined with smoky vetiver and a kiss of dark vanilla. The quintessence of luxury.",
    fragranceFamily: "Woody",
    topNotes: ["Black Pepper", "Cardamom"],
    middleNotes: ["Amber", "Vetiver"],
    baseNotes: ["Dark Vanilla", "Tonka Bean", "Cedar"],
    reviews: [
      { name: "Rohan K.", rating: 5, comment: "Premium quality at this price is unbelievable. My go-to fragrance." },
      { name: "Ananya P.", rating: 4, comment: "Warm and inviting. Perfect for winter evenings." },
    ],
  },
  {
    id: "midnight-veil",
    name: "Midnight Veil",
    price: 599,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=800&fit=crop",
    description: "Fresh citrus zest meets dark, woody depth. A modern fragrance for those who dare to be different.",
    fragranceFamily: "Fresh",
    topNotes: ["Bergamot", "Grapefruit", "Lemon"],
    middleNotes: ["Neroli", "Jasmine"],
    baseNotes: ["Cedarwood", "Vetiver", "White Musk"],
    reviews: [
      { name: "Vikram S.", rating: 5, comment: "Fresh yet deep. Perfect for daily wear." },
      { name: "Meera J.", rating: 4, comment: "Love the citrus opening. Great summer fragrance." },
    ],
  },
  
  {
    id: "oud-sovereign",
    name: "Oud Sovereign",
    price: 999,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=800&fit=crop",
    description: "The crown jewel of our collection. Pure oud blended with royal saffron and precious woods. For those who demand the extraordinary.",
    fragranceFamily: "Papa",
    topNotes: ["Saffron", "Cinnamon"],
    middleNotes: ["Oud", "Bulgarian Rose"],
    baseNotes: ["Agarwood", "Leather", "Amber"],
    reviews: [
      { name: "Rahul T.", rating: 5, comment: "This is the best oud fragrance I've ever tried at any price point." },
      { name: "Aisha N.", rating: 5, comment: "Royalty in a bottle. Worth every rupee." },
    ],
  },
];

export const testimonials = [
  { name: "Arjun M.", rating: 5, comment: "NOVER NOIR redefined luxury for me. Incredible quality at an unbeatable price." },
  { name: "Sneha R.", rating: 5, comment: "I've tried international brands that cost 10x more and NOVER NOIR holds its own. Truly premium." },
  { name: "Karan D.", rating: 5, comment: "The packaging alone feels like you're unboxing something from Paris. The scent? Even better." },
  { name: "Priya S.", rating: 4, comment: "Long-lasting, elegant, and affordable. What more could you ask for?" },
];
