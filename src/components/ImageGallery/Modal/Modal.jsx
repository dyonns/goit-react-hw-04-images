import PropTypes from 'prop-types';
import { useEffect } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ largeAlt, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModalByEsc);
    return () => {
      window.removeEventListener('keydown', handleCloseModalByEsc);
    };
  });

  const handleCloseModalByEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleCloseModal}>
      <div className={s.Modal}>
        <img src={largeAlt} alt={largeAlt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeAlt: PropTypes.string.isRequired,
  // largeSrc: PropTypes.string.isRequired,
};

export default Modal;
