import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

import { useFetch } from '../../hooks/useFetch';

import { CATEGORIES_URL } from '../../utils/config';

import css from './HeaderLinks.module.scss';

interface HeaderLinksProps {
  active: boolean;
  isShowCategories: boolean;
  setIsShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderLinks = ({ active, isShowCategories, setIsShowCategories }: HeaderLinksProps) => {
  const { data: categories }: UseQueryResult<{ data: string[] }> = useFetch(
    'categories',
    CATEGORIES_URL,
  );

  return (
    <>
      <div
        style={active ? { left: '0' } : { left: '-100%' }}
        className={cn(css.links, css.nav__links)}
      >
        <NavLink className={css.link} to='/'>
          Home
        </NavLink>
        <NavLink className={css.link} to='/products'>
          Products
        </NavLink>

        <div className={css.link} onClick={() => setIsShowCategories(!isShowCategories)}>
          Categories {isShowCategories ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          <AnimatePresence>
            {isShowCategories && (
              <motion.div
                className={css.dropdown}
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                transition={{ type: 'just' }}
              >
                {categories?.data.map((c: string) => (
                  <NavLink key={c} className={css.navlink} to={`category/${c}`}>
                    {c}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default HeaderLinks;
