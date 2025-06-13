export interface ProductDetails {
  [key: string]: string[];
}

export interface Product {
  badge: string;
  currency: string;
  final_price: number;
  link: string;
  offer: string;
  price_before: string;
  rate: number;
  reviews: number;
  thumbnail: string;
  title: string;
  id: number;
  details?: ProductDetails;
}

export interface Categories {
  id?: number;
  cover?: string;
  name: string;
  products?: Product[];
  products_count?: string;
}
export interface Groups {
  id: number;
  cover: string;
  name: string;
}

export interface Details {
  [key: string]: string[];
}
export interface ProductFilters {
  price_min?: number | null;
  price_max?: number | null;
  rate?: string[] | null;
  categories?: string[] | null;
  MainCategories?: string[] | null;
  // Allow any valid filter value type
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | null
    | undefined;
}
