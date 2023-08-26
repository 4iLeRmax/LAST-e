import { useAppSelector } from '../../hooks/reduxHooks';
import Card from '../../components/Card/Card';

import css from './FavouritesPage.module.scss';

const FavouritesPage = () => {
  const favourites = useAppSelector(({ favourites }) => favourites.favourites);

  return (
    <div className={css.wrap}>
      <h1 className={css.title}>FAVOURITES</h1>
      <div className={css.list}>
        {favourites.length > 0 ? (
          favourites.map((product) => (
            <>
              {/* <div className='w-[280px]'> */}
              <Card key={product.id} product={product} />
              {/* </div> */}
            </>
          ))
        ) : (
          <div className='text-center'>Favourites is empty</div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
