import { FC } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import css from './OverlayModal.module.scss';

interface OverlayModalProps {
  close?: () => void;
  zIndex: number;
}

const OverlayModal: FC<OverlayModalProps> = ({ close, zIndex }) => {
  const modal = document.getElementById('overlay');
  if (!modal) {
    return null;
  }

  return (
    <>
      {createPortal(
        <motion.div
          style={{ zIndex: `${zIndex}` }}
          className={css.overlay}
          onClick={close ? () => close() : () => {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
        />,
        modal,
      )}
    </>
  );
};

export default OverlayModal;
