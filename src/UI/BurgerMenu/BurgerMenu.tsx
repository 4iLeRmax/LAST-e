import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenuAltLeft } from 'react-icons/bi';

import css from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerMenu = ({ active, setActive }: BurgerMenuProps) => {
  return (
    <>
      <div className={css.menu}>
        <button onClick={() => setActive((p) => !p)}>
          {active ? <AiOutlineClose size={25} /> : <BiMenuAltLeft size={25} />}
        </button>
      </div>
    </>
  );
};

export default BurgerMenu;
