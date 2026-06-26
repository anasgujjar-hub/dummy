export interface Product {
  id: string;
  name: string;
  category: 'Milk' | 'Yogurt' | 'Cheese' | 'Butter' | 'Ice Cream';
  description: string;
  popularItems: string;
  price: number;
  rating: number;
  image: string;
  unit: string;
  sizes: string[];
  specs: {
    protein: string;
    calcium: string;
    fat: string;
    energy: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
  tags: string[];
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Received' | 'In Progress' | 'Replied';
}

export interface CartItem {
  id: string; // combination of productId and selectedSize
  product: Product;
  quantity: number;
  selectedSize: string;
}

export type ActivePage = 'home' | 'about' | 'products' | 'services' | 'ourmodel' | 'blog' | 'contact' | 'webmap';
