import CartPage from '../pages/CartPage/CartPage';
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import FavouritesPage from '../pages/FavouritesPage/FavouritesPage';
import HomePage from '../pages/HomePage/HomePage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import SingleProduct from '../pages/SingleProduct/SingleProduct';
import UserPage from '../pages/UserPage/UserPage';

//sdfsdfsfsdf

export const config = [
  { path: '/', element: HomePage },
  { path: '/products', element: ProductsPage },
  { path: '/product/:id', element: SingleProduct },
  { path: '/category/:name', element: CategoryPage },
  { path: '/favourites', element: FavouritesPage },
  { path: '/cart', element: CartPage },
  { path: '/user', element: UserPage },
];
