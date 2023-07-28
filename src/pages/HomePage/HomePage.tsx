import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import type { Product } from '../../types';

import { PRODUCTS_URL, reverseList } from '../../utils/config';
import { useAppSelector } from '../../hooks/reduxHooks';

import Slider from '../../components/Slider/Slider';
import List from '../../components/List/List';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const recents = useAppSelector(({ recents }) => recents.recents);
  const { data: products }: UseQueryResult<{ data: Product[] }> = useFetch(
    'products',
    PRODUCTS_URL,
  );

  const reversedRecents = reverseList(recents);

  return (
    <>
      <div className={styles.wrapper}>
        <Slider />
        {products?.data.length && (
          <List title='Popular product' list={products.data} listLength={5} filter='popular' />
        )}
        {recents.length > 0 && <List title='Recent Viewed' list={reversedRecents} listLength={5} />}
        {products?.data.length && (
          <List
            title='Less then 100 $'
            list={products.data}
            listLength={5}
            filter='less then'
            lessThen={100}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
