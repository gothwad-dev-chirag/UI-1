import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRODUCTS = [
  {
    id: 'p1',
    type: 'product',
    name: 'Pixel 9 Pro',
    price: 999,
    rating: 4.8,
    image: 'https://picsum.photos/seed/pixel9/400/400',
    description: 'The latest Google phone with advanced AI features and a stunning camera system.',
    category: 'Electronics'
  },
  {
    id: 'p2',
    type: 'product',
    name: 'Sony WH-1000XM5',
    price: 348,
    rating: 4.7,
    image: 'https://picsum.photos/seed/sonyheadphones/400/400',
    description: 'Industry-leading noise canceling headphones with premium sound quality.',
    category: 'Audio'
  },
  {
    id: 'p3',
    type: 'product',
    name: 'Kindle Paperwhite',
    price: 139,
    rating: 4.9,
    image: 'https://picsum.photos/seed/kindle/400/400',
    description: 'Now with a 6.8" display and thinner borders, adjustable warm light, up to 10 weeks of battery life.',
    category: 'Electronics'
  },
  {
    id: 'p4',
    type: 'product',
    name: 'Nike Air Zoom',
    price: 120,
    rating: 4.5,
    image: 'https://picsum.photos/seed/nike/400/400',
    description: 'Versatile running shoe for everyday training.',
    category: 'Fashion'
  },
  {
    id: 'p5',
    type: 'product',
    name: 'Mechanical Keyboard',
    price: 89,
    rating: 4.6,
    image: 'https://picsum.photos/seed/keyboard/400/400',
    description: 'Compact 75% layout with hot-swappable switches.',
    category: 'Electronics'
  }
];

export const APPS = [
  {
    id: 'a1',
    type: 'app',
    name: 'Focus Flow',
    price: 4.99,
    rating: 4.9,
    image: 'https://picsum.photos/seed/focusapp/200/200',
    description: 'A minimal productivity timer to help you stay in the zone.',
    developer: 'Zenith Labs',
    size: '12 MB'
  },
  {
    id: 'a2',
    type: 'app',
    name: 'Sky Weather Pro',
    price: 2.99,
    rating: 4.7,
    image: 'https://picsum.photos/seed/weatherapp/200/200',
    description: 'Hyper-local weather forecasts with beautiful visualizations.',
    developer: 'Atmosphere Inc.',
    size: '45 MB'
  },
  {
    id: 'a3',
    type: 'app',
    name: 'Retro Cam',
    price: 1.99,
    rating: 4.5,
    image: 'https://picsum.photos/seed/camapp/200/200',
    description: 'Vintage film filters for your modern photos.',
    developer: 'Pixel Nostalgia',
    size: '85 MB'
  },
  {
    id: 'a4',
    type: 'app',
    name: 'Budget Buddy',
    price: 0,
    rating: 4.8,
    image: 'https://picsum.photos/seed/financeapp/200/200',
    description: 'Track your expenses and save money effortlessly.',
    developer: 'FinTech Sol',
    size: '22 MB'
  }
];
