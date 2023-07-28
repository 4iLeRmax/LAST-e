import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

import type { TFormType } from '../../types';

import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';

import css from './RightSideModal.module.scss';

interface LoginFormProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightSideModal = ({ close }: LoginFormProps) => {
  const [formType, setFormType] = useState<TFormType>('SIGNUP');
  const width = window.innerWidth;

  const modal = document.getElementById('form');
  if (!modal) {
    return;
  }

  return (
    <>
      {createPortal(
        <motion.div
          className={css.wrapper}
          // initial={{ x: 200, opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // exit={{ x: 200, opacity: 0 }}
          // initial={{ y: 500, opacity: 0, scale: 0 }}
          // animate={{ y: 0, opacity: 1, scale: 1 }}
          // exit={{ y: 500, opacity: 0, scale: 0 }}
          initial={width > 500 ? { x: 200, opacity: 0 } : { y: 500, opacity: 0, scale: 0 }}
          animate={width > 500 ? { x: 0, opacity: 1 } : { y: 0, opacity: 1, scale: 1 }}
          exit={width > 500 ? { x: 200, opacity: 0 } : { y: 500, opacity: 0, scale: 0 }}
          transition={{ type: 'tween' }}
        >
          <div className={css.header}>
            <button className={css.close} onClick={() => close(false)}>
              <AiOutlineClose />
            </button>
            <div className={css.title}>{formType}</div>
          </div>
          <AnimatePresence>
            {formType === 'SIGNUP' ? (
              <SignUpForm setFormType={setFormType} />
            ) : (
              <LoginForm setFormType={setFormType} />
            )}
          </AnimatePresence>
        </motion.div>,
        modal,
      )}
    </>
  );
};

export default RightSideModal;
