import { Product, TCategories } from '../types';

export const BASE_URL = `https://fakestoreapi.com`;
export const CATEGORIES_URL = `${BASE_URL}/products/categories`;
export const PRODUCTS_URL = `${BASE_URL}/products`;

export const USERS = 'https://api.escuelajs.co/api/v1/users';

export const shortSentence = (sentence: string, words: number) =>
  sentence.replace(/\s/g, ', ').split(',').slice(0, words);

export const popular = (list: Product[]) => list.filter((item) => item.rating.rate > 4);
export const less_then = (list: Product[], maxPrice: number) =>
  list.filter((item) => item.price <= maxPrice);
export const sameCategory = (list: Product[], category: TCategories) =>
  list.filter((item) => item.category === category);
export const reverseList = (list: Product[]) => [...list].reverse();

export const defaultValue = {
  id: 0,
  email: '',
  password: '',
  name: '',
  role: '',
  avatar: '',
  creationAt: '',
  updatedAt: '',
};
