import { FC } from 'react';
import Card from '../Card/Card';

import { less_then, popular, sameCategory } from '../../utils/config';
import { Product, TCategories } from '../../types';
import css from './List.module.scss';

const POPULAR: string = 'popular';
const LESS_THEN: string = 'less then';
const SAME_CATEGORY: string = 'same category';

type ListProps = {
  title: string;
  list: Product[];
  listLength: number;
  filter?: 'popular' | 'less then' | 'same category';
} & (TFilter | { filter?: never; category?: never; lessThen?: never });

type TFilter =
  | ({ filter: 'popular' | 'less then' | 'same category' } & TFilterSameCategory)
  | TFilterLessThen
  | TFilterPopular;

type TFilterSameCategory = {
  filter: 'same category';
  category: TCategories;
  lessThen?: never;
};

type TFilterLessThen = {
  filter: 'less then';
  lessThen: number;
  category?: never;
};

type TFilterPopular = {
  filter: 'popular';
  lessThen?: never;
  category?: never;
};

const List: FC<ListProps> = ({ title, list, listLength, filter, category, lessThen }) => {
  let newList: Product[] = [];

  if (filter) {
    switch (filter) {
      case POPULAR:
        newList = popular(list);
        break;
      case LESS_THEN:
        if (lessThen) {
          newList = less_then(list, lessThen);
        }
        break;
      case SAME_CATEGORY:
        if (category) {
          newList = sameCategory(list, category);
        }
        break;
      default:
        newList = list;
    }
  } else {
    newList = list;
  }

  newList = newList.filter((_, i) => i < listLength);
  // console.log(newList);

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>{title.toUpperCase()}</h1>
      <div className={css.list}>
        {newList.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default List;
