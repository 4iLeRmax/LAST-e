import { useEffect, useState } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { removeTokens } from '../../store/reducers/userSlice';

import type { IUser } from '../../types';

import css from './UserPage.module.scss';
import { defaultValue } from '../../utils/config';
import InputForm from '../../components/InputForm/InputForm';

const UserPage = () => {
  const [updateInfo, setUpdateInfo] = useState<IUser>(defaultValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { access_token } = useAppSelector(({ user }) => user.tokens);

  const { data: userInfo, refetch }: UseQueryResult<IUser> = useQuery(
    ['currentUser'],
    async () =>
      await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    {
      enabled: access_token.length > 0,
      select: (userInfo) => userInfo.data,
    },
  );

  const exitFromAcc = () => {
    dispatch(removeTokens());
    navigate('/');
  };

  if (!access_token) {
    setTimeout(() => {
      navigate('/');
    }, 1);
    return <>Enter in your account </>;
  }

  // console.log(updateInfo);

  useEffect(() => {
    refetch();
  }, [updateInfo]);

  return (
    <div className={css.wrap}>
      {userInfo && (
        <>
          <h1 className={css.title}>
            WELCOME {updateInfo.name.length > 0 ? updateInfo.name : userInfo?.name}
          </h1>

          <div className={css.main}>
            <div className={css.avatarInfo}>
              <div className={css.avatar}>
                <img src={updateInfo.avatar.length > 0 ? updateInfo.avatar : userInfo?.avatar} />
              </div>
            </div>

            <div className={css.inputs}>
              {userInfo && (
                <>
                  <InputForm
                    label='avatar'
                    required={true}
                    defaultValue={userInfo?.avatar}
                    userId={userInfo.id}
                    setUpdateInfo={setUpdateInfo}
                  />
                  <InputForm
                    label='name'
                    required={true}
                    defaultValue={userInfo?.name}
                    userId={userInfo.id}
                    setUpdateInfo={setUpdateInfo}
                  />
                  <InputForm
                    label='email'
                    required={true}
                    defaultValue={userInfo?.email}
                    userId={userInfo.id}
                    setUpdateInfo={setUpdateInfo}
                  />
                  <InputForm
                    label='password'
                    required={true}
                    defaultValue={userInfo?.password}
                    userId={userInfo.id}
                    setUpdateInfo={setUpdateInfo}
                    password={true}
                  />
                </>
              )}
            </div>
          </div>
          <div className='w-full mt-20 flex items-center justify-end'>
            <div className={css.exit__wrap}>
              <span className='flex'>Press to exit from your account:</span>
              <button onClick={exitFromAcc} className={css.exit}>
                EXIT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
