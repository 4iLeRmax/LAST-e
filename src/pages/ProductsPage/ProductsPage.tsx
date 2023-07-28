import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { PRODUCTS_URL } from '../../utils/config';
import type { Product } from '../../types';

import Card from '../../components/Card/Card';

import css from './ProductsPage.module.scss';

const ProductsPage = () => {
  const { data: products }: UseQueryResult<{ data: Product[] }> = useFetch(
    'products',
    PRODUCTS_URL,
  );

  return (
    <div className={css.wrap}>
      <h1 className={css.title}>ALL PRODUCTS</h1>
      <div className={css.list}>
        {products?.data.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
