import React, { FC } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

import styles from './Search.module.scss';

interface SearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FC<SearchProps> = ({ value, setValue }) => {
  return (
    <div className={styles.Search}>
      <div className={styles.icon}>
        <BsSearch size='16px' />
      </div>
      {value.length > 0 && (
        <div className={styles.icon__close} onClick={() => setValue('')}>
          <IoMdClose size='16px' />
        </div>
      )}
      <input
        className={styles.input}
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Search...'
      />
    </div>
  );
};

export default Search;
