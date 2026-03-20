export type Category = {
  id: number; // ✅ fix this
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};


export type ProductResponse = {
  categoryId: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
};