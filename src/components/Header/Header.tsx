import { FC, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { BsCart, BsHeart } from 'react-icons/bs';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { BiMenuAltLeft } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';

import { cartItem } from '../../store/reducers/cartSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useFetch } from '../../hooks/useFetch';
import { IUser, Product } from '../../types';
import { CATEGORIES_URL, PRODUCTS_URL } from '../../utils/config';

import Search from '../Search/Search';

import OverlayModal from '../../Modals/OverlayModal/OverlayModal';
import SearchModal from '../../Modals/SearchModal/SearchModal';
import RightSideModal from '../../Modals/Login/RightSideModal';
import UserModal from '../../Modals/UserModal/UserModal';

import styles from './Header.module.scss';

const Header: FC = () => {
  const { access_token } = useAppSelector(({ user }) => user.tokens);

  const [zIndex, setZIndex] = useState(10);
  const [active, setActive] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowCategories, setIsShowCategories] = useState(false);
  const [isShowUser, setIsShowUser] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const cart = useAppSelector(({ cart }) => cart.cart);
  const favourites = useAppSelector(({ favourites }) => favourites.favourites);

  const { data: products }: UseQueryResult<{ data: Product[] }> = useFetch(
    'products',
    PRODUCTS_URL,
  );
  const { data: categories }: UseQueryResult<{ data: string[] }> = useFetch(
    'categories',
    CATEGORIES_URL,
  );
  
  const location = useLocation();

  const closeOverlay = () => {
    setIsShowCategories(false);
    setIsShowForm(false);
    setZIndex(10);
  };

  useEffect(() => {
    closeOverlay();
    setActive(false);
  }, [location.pathname]);

  const { data: userInfo }: UseQueryResult<IUser> = useQuery(
    ['currentUser'],
    async () =>
      await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    {
      enabled: access_token.length > 0,
      select: (userInfo) => userInfo.data,
    },
  );

  const orderQuantity = (arr: cartItem[]) => arr.reduce((calc, el) => calc + el.quantity, 0);

  return (
    <>
      <div className={styles.mobile__links}>
        <NavLink to='favourites' className={styles.add__link}>
          <BsHeart size='25px' />
          {favourites.length > 0 && (
            <span style={{ fontSize: '10px' }}>
              {favourites.length > 9 ? '9+' : favourites.length}
            </span>
          )}
        </NavLink>
        {access_token ? (
          <div className='relative'>
            <NavLink to='/user'>
              {userInfo ? (
                <div className={styles.avatar}>
                  <img src={userInfo.avatar} />
                </div>
              ) : (
                <div className={styles.fakeAvatar}></div>
              )}
            </NavLink>
          </div>
        ) : (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setIsShowForm(!isShowForm);
              setZIndex(20);
            }}
          >
            <AiOutlineUser size='25px' />
          </div>
        )}
        <NavLink to='/cart' className={styles.add__link}>
          <BsCart size='25px' />
          {cart.length > 0 && (
            <span style={{ fontSize: '10px' }}>
              {orderQuantity(cart) > 9 ? '9+' : orderQuantity(cart)}
            </span>
          )}
        </NavLink>
      </div>

      <AnimatePresence>
        {(isShowCategories || searchValue.length > 0 || isShowForm) && (
          <OverlayModal close={closeOverlay} zIndex={zIndex} />
        )}
      </AnimatePresence>

      <AnimatePresence>{isShowForm && <RightSideModal close={closeOverlay} />}</AnimatePresence>
      <div className={styles.Header}>
        <div className={styles.menu}>
          <button onClick={() => setActive((p) => !p)}>
            {active ? <AiOutlineClose size={25} /> : <BiMenuAltLeft size={25} />}
          </button>
        </div>

        <NavLink to='/' className={styles.logo}>
          LAST'e
        </NavLink>
        <div
          style={active ? { left: '0' } : { left: '-100%' }}
          className={cn(styles.links, styles.nav__links)}
        >
          <NavLink className={styles.link} to='/'>
            Home
          </NavLink>
          <NavLink className={styles.link} to='/products'>
            Products
          </NavLink>

          <div className={styles.link} onClick={() => setIsShowCategories(!isShowCategories)}>
            Categories {isShowCategories ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            <AnimatePresence>
              {isShowCategories && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ x: -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -400, opacity: 0 }}
                  transition={{ type: 'just' }}
                >
                  {categories?.data.map((c: string) => (
                    <NavLink key={c} className={styles.navlink} to={`category/${c}`}>
                      {c}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.search}>
          <Search value={searchValue} setValue={setSearchValue} />
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

        <div className={cn(styles.links, styles.icons)}>
          <NavLink to='favourites' className={styles.add__link}>
            <BsHeart size='25px' />
            {favourites.length > 0 && (
              <span style={{ fontSize: '10px' }}>
                {favourites.length > 9 ? '9+' : favourites.length}
              </span>
            )}
          </NavLink>
          <NavLink to='/cart' className={styles.add__link}>
            <BsCart size='25px' />
            {cart.length > 0 && (
              <span style={{ fontSize: '10px' }}>
                {orderQuantity(cart) > 9 ? '9+' : orderQuantity(cart)}
              </span>
            )}
          </NavLink>
          {access_token ? (
            <div className='relative'>
              <NavLink
                to='/user'
                onMouseEnter={() => setIsShowUser(true)}
                onMouseLeave={() => setIsShowUser(false)}
              >
                {userInfo ? (
                  <div className={styles.avatar}>
                    <img src={userInfo.avatar} />
                  </div>
                ) : (
                  <div className={styles.fakeAvatar}></div>
                )}
              </NavLink>
              {userInfo && (
                <div className={isShowUser ? 'opacity-100' : 'opacity-0'}>
                  <UserModal avatar={userInfo.avatar} name={userInfo.name} email={userInfo.email} />
                </div>
              )}
            </div>
          ) : (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIsShowForm(!isShowForm);
                setZIndex(20);
              }}
            >
              <AiOutlineUser size='25px' />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
