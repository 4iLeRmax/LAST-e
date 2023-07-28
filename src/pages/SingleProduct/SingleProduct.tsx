import { useEffect } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useFetch } from '../../hooks/useFetch';
import type { Product, updProduct } from '../../types';
import { BASE_URL, PRODUCTS_URL, reverseList } from '../../utils/config';

import { addToCart } from '../../store/reducers/cartSlice';
import { addToFavourites } from '../../store/reducers/favouriteSlice';
import { addToRecents } from '../../store/reducers/recentSlice';

import List from '../../components/List/List';

import css from './SingleProduct.module.scss';

const SingleProduct = () => {
  const { id } = useParams();
  const { data: products }: UseQueryResult<{ data: Product[] }> = useFetch(
    'products',
    PRODUCTS_URL,
  );

  const { data: product }: UseQueryResult<{ data: updProduct }> = useFetch(
    `products, ${id}`,
    `${BASE_URL}/products/${id}`,
    {
      enabled: !!id,
    },
  );
  const dispatch = useAppDispatch();
  const recents = useAppSelector(({ recents }) => recents.recents);

  const productIsInRecents = () => product?.data && recents.includes(product?.data);

  useEffect(() => {
    !productIsInRecents() && product?.data && dispatch(addToRecents(product.data));
    // console.log(productIsInRecents());
  }, [product, id]);

  const reversedRecents = reverseList(recents);
  // console.log(reversedRecents);

  return (
    <>
      {product?.data && (
        <div className={css.product}>
          <div className={css.card__wrap}>
            <div className={css.card}>
              <div className={css.image}>
                <img src={product?.data.image} alt='' />
              </div>
              <div className={css.info}>
                <div className={css.title}>{product?.data.title}</div>
                <div className={css.description}>{product?.data.description}</div>
                <div className={css.add}>
                  <div className={css.price}>{product?.data.price}$</div>
                  <div className={css.rating}>
                    <span>{product?.data.rating.rate} / 5</span>
                    {product?.data.rating.count} votes
                  </div>
                </div>

                <div className={css.btns}>
                  <button onClick={() => dispatch(addToCart(product?.data))}>Add to cart </button>
                  <button onClick={() => dispatch(addToFavourites(product?.data))}>
                    Add to favourites
                  </button>
                </div>
              </div>
            </div>
          </div>
          {products?.data.length && (
            <List
              title='Same category'
              list={products.data}
              listLength={5}
              filter='same category'
              category={product?.data.category}
            />
          )}
          {recents.length > 0 && (
            <List title='Recent Viewed' list={reversedRecents} listLength={5} />
          )}
        </div>
      )}
    </>
  );
};

export default SingleProduct;
