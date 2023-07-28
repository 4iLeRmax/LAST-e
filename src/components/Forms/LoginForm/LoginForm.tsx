import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { addTokens } from '../../../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { TFormType } from '../../../types';
import { motion } from 'framer-motion';

import loading from '../../../img/Rolling-1s-200px.svg';

import css from '../Forms.module.scss';

type TLoginForm = {
  email: string;
  password: string;
};

interface LoginFormProps {
  setFormType: (value: React.SetStateAction<TFormType>) => void;
}

const LoginForm = ({ setFormType }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginForm>();

  const {
    mutate,
    data: tokens,
    isLoading,
  } = useMutation({
    mutationFn: (data: TLoginForm) =>
      axios.post(' https://api.escuelajs.co/api/v1/auth/login', data),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    mutate(data);
    reset();
  });

  const handleNavigate = () => {
    navigate('/user');
  };

  if (tokens) {
    // console.log(tokens?.data);
    dispatch(addTokens(tokens?.data));
    handleNavigate();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -400 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -400 }}
      transition={{ duration: 0.7, type: 'spring' }}
    >
      {isLoading ? (
        <div className='w-full h-[200px] flex items-center justify-center'>
          <img src={loading} className='w-10' />
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <div className={css.input__wrap}>
              <input
                type='email'
                {...register('email', {
                  required: { value: true, message: 'Enter your e-mail' },
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid mail' },
                  minLength: 8,
                  maxLength: 120,
                })}
                placeholder='E-mail'
              />
              {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
            </div>

            <div className={css.input__wrap}>
              <input
                type='text'
                {...register('password', {
                  required: { value: true, message: 'Enter a password' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message: 'Invalid password',
                  },
                })}
                placeholder='Password'
              />
              {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
            </div>

            <button
              className='mt-5 w-full py-2 flex items-center justify-center bg-gray-800 text-gray-100 tracking-widest rounded-md transition-colors hover:bg-gray-700'
              type='submit'
            >
              Login
            </button>
          </form>
          <button className={css.secondaryBtn} onClick={() => setFormType('SIGNUP')}>
            Sign up
          </button>
        </>
      )}
    </motion.div>
  );
};

export default LoginForm;
