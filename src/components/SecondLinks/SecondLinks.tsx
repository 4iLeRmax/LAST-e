import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { BsHeart, BsCart } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';

import { UserModalProps } from '../../Modals/UserModal/UserModal';

import { IUser, Product } from '../../types';
import { cartItem } from '../../store/reducers/cartSlice';

import css from './SecondLinks.module.scss';

interface SecondLinksProps {
  cart: cartItem[];
  favourites: Product[];
  userInfo: IUser | undefined;
  access_token: string;
  orderQuantity: (arr: cartItem[]) => number;
  setZIndex: React.Dispatch<React.SetStateAction<number>>;
  isShowForm: boolean;
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  UserModal: ({ avatar, name, email }: UserModalProps) => JSX.Element;
}

const SecondLinks = ({
  cart,
  favourites,
  access_token,
  isShowForm,
  setIsShowForm,
  orderQuantity,
  setZIndex,
  userInfo,
  UserModal,
}: SecondLinksProps) => {
  const [isShowUser, setIsShowUser] = useState(false);

  return (
    <>
      <div className={cn(css.links, css.icons)}>
        <NavLink to='favourites' className={css.add__link}>
          <BsHeart size='25px' />
          {favourites.length > 0 && (
            <span style={{ fontSize: '10px' }}>
              {favourites.length > 9 ? '9+' : favourites.length}
            </span>
          )}
        </NavLink>
        <NavLink to='/cart' className={css.add__link}>
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
                <div className={css.avatar}>
                  <img src={userInfo.avatar} />
                </div>
              ) : (
                <div className={css.fakeAvatar}></div>
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
    </>
  );
};

export default SecondLinks;
