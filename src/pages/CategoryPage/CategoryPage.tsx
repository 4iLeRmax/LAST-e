import { UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { Product } from '../../types';
import Card from '../../components/Card/Card';

import css from './CategoryPage.module.scss';
import { useFetch } from '../../hooks/useFetch';

const CategoryPage = () => {
  const { name } = useParams();

  const { data: category }: UseQueryResult<{ data: Product[] }> = useFetch(
    `products', ${name}`,
    `${BASE_URL}/products/category/${name}`,
    { enabled: !!name },
  );

  return (
    <>
      <h1 className={css.title}>{name?.toUpperCase()}</h1>
      <div className={css.list}>
        {category?.data.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
