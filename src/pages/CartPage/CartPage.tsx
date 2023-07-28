import { useAppSelector } from '../../hooks/reduxHooks';
import CartItem from '../../components/CartItem/CartItem';

import css from './CartPage.module.scss';

const CartPage = () => {
  const cart = useAppSelector(({ cart }) => cart.cart);

  const totalCost =
    Math.round(
      cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity * currentValue.price;
      }, 0) * 100,
    ) / 100;

  return (
    <div className={css.wrap}>
      <h1 className={css.title}>CART</h1>
      <div className={css.list}>
        {cart.length > 0 ? (
          <>
            {cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
            <div className={css.total}>
              Total:
              <span className={css.totalCost}>
                {totalCost} $
              </span>
            </div>
          </>
        ) : (
          <>Cart is empty</>
        )}
      </div>
    </div>
  );
};

export default CartPage;
