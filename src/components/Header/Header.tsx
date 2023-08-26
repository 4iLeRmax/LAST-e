import { FC, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';

import { cartItem } from '../../store/reducers/cartSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import { IUser } from '../../types';

import BurgerMenu from '../../UI/BurgerMenu/BurgerMenu';
import HeaderLinks from '../HeaderLinks/HeaderLinks';
import Search from '../../components/Search/Search';
import HeaderIconLinks from '../HeaderIconLinks/HeaderIconLinks';

import OverlayModal from '../../Modals/OverlayModal/OverlayModal';
import RightSideModal from '../../Modals/RightSideModal/RightSideModal';
import UserModal from '../../Modals/UserModal/UserModal';

import styles from './Header.module.scss';
import SecondLinks from '../SecondLinks/SecondLinks';

const Header: FC = () => {
  const { access_token } = useAppSelector(({ user }) => user.tokens);

  const [zIndex, setZIndex] = useState(10);
  const [active, setActive] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowCategories, setIsShowCategories] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const cart = useAppSelector(({ cart }) => cart.cart);
  const favourites = useAppSelector(({ favourites }) => favourites.favourites);

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
      <HeaderIconLinks
        cart={cart}
        favourites={favourites}
        access_token={access_token}
        isShowForm={isShowForm}
        setIsShowForm={setIsShowForm}
        setZIndex={setZIndex}
        userInfo={userInfo}
        orderQuantity={orderQuantity}
      />

      <AnimatePresence>
        {(isShowCategories || searchValue.length > 0 || isShowForm) && (
          <OverlayModal close={closeOverlay} zIndex={zIndex} />
        )}
      </AnimatePresence>

      <AnimatePresence>{isShowForm && <RightSideModal close={closeOverlay} />}</AnimatePresence>

      <div className={styles.Header}>
        <BurgerMenu active={active} setActive={setActive} />
        <NavLink to='/' className={styles.logo}>
          LAST'e
        </NavLink>
        <HeaderLinks
          active={active}
          isShowCategories={isShowCategories}
          setIsShowCategories={setIsShowCategories}
        />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <SecondLinks
          cart={cart}
          favourites={favourites}
          access_token={access_token}
          UserModal={UserModal}
          isShowForm={isShowForm}
          setIsShowForm={setIsShowForm}
          orderQuantity={orderQuantity}
          setZIndex={setZIndex}
          userInfo={userInfo}
        />
      </div>
    </>
  );
};

export default Header;
