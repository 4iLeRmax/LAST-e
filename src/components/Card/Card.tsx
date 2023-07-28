import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCart, BsCartFill, BsHeart, BsHeartFill } from 'react-icons/bs';

import { addToFavourites, removeFromFavourites } from '../../store/reducers/favouriteSlice';
import { addToCart, removeFromCart } from '../../store/reducers/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { shortSentence } from '../../utils/config';

import { Product } from '../../types';

import styles from './Card.module.scss';

interface CardProps {
  product: Product;
}

const Card: FC<CardProps> = ({ product }) => {
  const [isScale, setIsScale] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(({ cart }) => cart.cart);
  const favourites = useAppSelector(({ favourites }) => favourites.favourites);

  const productIsIn = (list: Product[]) => {
    const find = list.some((item) => item.id === product.id);
    if (find) {
      return true;
    }
  };

  const cartInteraction = (product: Product) => {
    if (productIsIn(cart)) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const favouritesInteraction = (product: Product) => {
    if (productIsIn(favourites)) {
      dispatch(removeFromFavourites(product.id));
    } else {
      dispatch(addToFavourites(product));
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.Card}>
        <div className={styles.fav} onClick={() => favouritesInteraction(product)}>
          {productIsIn(favourites) ? <BsHeartFill size='22px' /> : <BsHeart size='22px' />}
        </div>
        <Link to={`/product/${product.id}`}>
          <div
            className={styles.img}
            onMouseEnter={() => setIsScale(true)}
            onMouseLeave={() => setIsScale(false)}
          >
            <img className={isScale ? styles.scale : ''} src={product.image} alt={product.title} />
          </div>
          <h1 className={styles.title}>{shortSentence(product.title, 5)}</h1>
        </Link>
        <div className={styles.category}>{product.category}</div>
        <div className={styles.add}>
          <p className={styles.price}>{product.price}$</p>
          <div className={styles.cart} onClick={() => cartInteraction(product)}>
            {productIsIn(cart) ? <BsCartFill size='22px' /> : <BsCart size='22px' />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
