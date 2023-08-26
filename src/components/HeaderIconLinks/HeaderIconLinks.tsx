import React from 'react';
import { NavLink } from 'react-router-dom';

import { BsHeart, BsCart } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';

import { IUser, Product } from '../../types';
import { cartItem } from '../../store/reducers/cartSlice';

import css from './HeaderIconLinks.module.scss';

interface MobileLinksProps {
  cart: cartItem[];
  favourites: Product[];
  userInfo: IUser | undefined;
  access_token: string;
  orderQuantity: (arr: cartItem[]) => number;
  setZIndex: React.Dispatch<React.SetStateAction<number>>;
  isShowForm: boolean;
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileLinks = ({
  cart,
  favourites,
  userInfo,
  access_token,
  isShowForm,
  setIsShowForm,
  orderQuantity,
  setZIndex,
}: MobileLinksProps) => {
  return (
    <>
      <div className={css.mobile__links}>
        <NavLink to='favourites' className={css.add__link}>
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
                <div className={css.avatar}>
                  <img src={userInfo.avatar} />
                </div>
              ) : (
                <div className={css.fakeAvatar}></div>
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
        <NavLink to='/cart' className={css.add__link}>
          <BsCart size='25px' />
          {cart.length > 0 && (
            <span style={{ fontSize: '10px' }}>
              {orderQuantity(cart) > 9 ? '9+' : orderQuantity(cart)}
            </span>
          )}
        </NavLink>
      </div>
    </>
  );
};

export default MobileLinks;
