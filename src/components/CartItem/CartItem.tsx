import { FC } from 'react';
import styles from './CartItem.module.scss';
import { NavLink } from 'react-router-dom';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { cartItem, removeFromCart } from '../../store/reducers/cartSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { toggleQuantity } from '../../store/reducers/cartSlice';

interface CartItemProps {
  product: cartItem;
}

const CartItem: FC<CartItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  // const cart = useAppSelector(({ cart }) => cart.cart);

  const changeQuantity = (quantity: number) => {
    quantity >= 1 && quantity <= 9 && dispatch(toggleQuantity({ ...product, quantity }));
  };

  console.log(product.title.split(' ').slice(0, 5));

  return (
    <div className={styles.CartItem}>
      <NavLink to={`/product/${product.id}`} className={styles.main}>
        <div>
          <div className={styles.img}>
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <h1>{product.title}</h1>
      </NavLink>

      <div className={styles.info}>
        <div className={styles.quantity}>
          <button onClick={() => changeQuantity(product.quantity - 1)}>
            <AiOutlineMinus size='20px' />
          </button>
          <div className={styles.count}>{product.quantity}</div>
          <button onClick={() => changeQuantity(product.quantity + 1)}>
            <AiOutlinePlus size='20px' />
          </button>
        </div>
        <div className={styles.prices}>
          <span className={styles.price}>{product.price}$</span>
          <span>{Math.round(product.quantity * product.price * 100) / 100}$</span>
        </div>
        <div className={styles.close} onClick={() => dispatch(removeFromCart(product.id))}>
          <AiOutlineClose size='20px' />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
