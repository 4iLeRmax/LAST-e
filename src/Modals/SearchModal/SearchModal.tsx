import React, { FC } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Product } from '../../types';

import styles from '../../components/Header/Header.module.scss';

interface SearchModalProps {
  searchValue: string;
  products: { data: Product[] };
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchModal: FC<SearchModalProps> = ({ products, searchValue, setSearchValue }) => {
  return (
    <>
      {searchValue.length > 0 && (
        <motion.div
          className={cn(styles.dropdown, styles.search__dropdown)}
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'tween', duration: .2 }}
        >
          {products?.data.length &&
          products?.data.filter(({ title }) =>
            title.toLowerCase().includes(searchValue.toLowerCase()),
          ).length > 0 ? (
            products?.data
              .filter(({ title }) => title.toLowerCase().includes(searchValue.toLowerCase()))
              .map(({ id, title }) => {
                return (
                  <NavLink
                    onClick={() => setSearchValue('')}
                    className={styles.navlink}
                    key={id}
                    to={`product/${id}`}
                  >
                    {title}
                  </NavLink>
                );
              })
          ) : (
            <span className={styles.error}>No result</span>
          )}
        </motion.div>
      )}
    </>
  );
};

export default SearchModal;
