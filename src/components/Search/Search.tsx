import React from 'react';
import { AnimatePresence } from 'framer-motion';

import InputSearch from '../../UI/InputSearch/InputSearch';
import SearchModal from '../../Modals/SearchModal/SearchModal';

import css from './Search.module.scss';
import { useFetch } from '../../hooks/useFetch';
import { PRODUCTS_URL } from '../../utils/config';
import { UseQueryResult } from '@tanstack/react-query';
import { Product } from '../../types';

interface SearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchValue, setSearchValue }: SearchProps) => {
  const { data: products }: UseQueryResult<{ data: Product[] }> = useFetch(
    'products',
    PRODUCTS_URL,
  );

  return (
    <>
      <div className={css.search}>
        <InputSearch value={searchValue} setValue={setSearchValue} />
        <AnimatePresence>
          {products?.data.length && (
            <SearchModal
              products={products}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Search;
