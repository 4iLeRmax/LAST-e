export type updProduct = {
  category: TCategories;
} & Omit<Product, 'catetegory'>;

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export type TCategories = 'electronics' | 'jewelery' | "men's clothing" | "women's clothing";

export type TFormType = 'LOGIN' | 'SIGNUP';

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
  repeatpassword: string
  avatar: string;
};

export type TTokens = { access_token: string; refresh_token: string };

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

