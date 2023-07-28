import { useForm } from 'react-hook-form';

import type { TFormType, TRegisterForm } from '../../../types';
import { USERS } from '../../../utils/config';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

import loading from '../../../img/Rolling-1s-200px.svg';

import css from '../Forms.module.scss';

interface SignUpFormProps {
  setFormType: (value: React.SetStateAction<TFormType>) => void;
}

const SignUpForm = ({ setFormType }: SignUpFormProps) => {
  // const [userInfo, setUserInfo] = useState<TRegisterForm>(DefaultRegisterForm);

  const mutation = useMutation({
    mutationFn: (newTodo: TRegisterForm) => {
      return axios.post(`${USERS}`, newTodo);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterForm>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (data.password === data.repeatpassword) {
      mutation.mutate(data);
      setFormType('LOGIN');
    }
    reset();
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -400 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -400 }}
      transition={{ duration: 0.7, type: 'spring' }}
    >
      {mutation.isLoading ? (
        <div className='w-full h-[200px] flex items-center justify-center'>
          <img src={loading} className='w-10' />
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <div className={css.input__wrap}>
              <input
                type='text'
                {...register('name', {
                  required: { value: true, message: 'Enter your name' },
                  pattern: { value: /^[a-zA-Z]+$/, message: 'Invalid name' },
                  minLength: 2,
                  maxLength: 120,
                })}
                placeholder='Name'
              />
              {errors.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
            </div>

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

            <div className={css.input__wrap}>
              <input
                type='text'
                {...register('repeatpassword', {
                  required: { value: true, message: 'Enter a password' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message: 'Invalid password',
                  },
                })}
                placeholder='Repeat Password'
              />
              {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
            </div>

            <div className={css.input__wrap}>
              <input
                type='text'
                {...register('avatar', {
                  required: { value: true, message: 'Enter your Avatar URL' },
                })}
                placeholder='Avatar URL'
              />
              {errors.avatar && <div style={{ color: 'red' }}>{errors.avatar.message}</div>}
            </div>

            <button
              className='mt-5 w-full py-2 flex items-center justify-center bg-gray-800 text-gray-100 tracking-widest rounded-md transition-colors hover:bg-gray-700'
              type='submit'
            >
              Sign up
            </button>
          </form>
          <button className={css.secondaryBtn} onClick={() => setFormType('LOGIN')}>
            Login
          </button>
        </>
      )}
    </motion.div>
  );
};

export default SignUpForm;
