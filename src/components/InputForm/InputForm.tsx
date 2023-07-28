import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { IUser } from '../../types';

import { USERS } from '../../utils/config';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

import css from './InputForm.module.scss';

interface InputFormProps {
  label: string;
  required: boolean | { value: boolean; message: string };
  defaultValue: string;
  userId: number;
  setUpdateInfo: React.Dispatch<React.SetStateAction<IUser>>;
  password?: boolean;
}

const InputForm = ({
  label,
  required,
  defaultValue,
  userId,
  setUpdateInfo,
  password,
}: InputFormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      [label]: defaultValue,
    },
  });

  const {
    mutate,
    isLoading,
    isSuccess,
    isError,
    status,
    data: resAfterMutate,
  } = useMutation({
    mutationFn: (data: string) => axios.put(`${USERS}/${userId}`, data),
  });

  const onSubmit = handleSubmit((data: any) => {
    mutate(data);
  });

  useEffect(() => {
    resAfterMutate?.data && setUpdateInfo(resAfterMutate?.data);
  }, [isSuccess]);

  // console.log({ status });
  console.log(status);

  return (
    <form onSubmit={onSubmit} className={css.wrap}>
      <div>
        <h1>{label[0].toUpperCase() + label.slice(1)}:</h1>
      </div>
      <div className={css.input__wrap}>
        <input
          className={css.input}
          type={password ? (isVisible ? 'text' : 'password') : 'text'}
          placeholder='URL for avatar'
          {...register(label, { required })}
        />
        {password && (
          <div className={css.password__visibility} onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
          </div>
        )}
      </div>
      <div className={css.button__wrap}>
        <button type='submit' disabled={isLoading || isError}>
          {status === 'idle'
            ? 'UPDATE'
            : status === 'loading'
            ? 'UPDATING...'
            : status === 'success'
            ? 'UPDATED'
            : status === 'error'
            ? 'X'
            : 'UPDATE'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
