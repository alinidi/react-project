import { useEffect } from 'react';
import s from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

type ModalType = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

function Modal({ children, handleClose, isOpen }: ModalType) {
  useEffect(() => {
    const closeOnEscape = (e: { key: string }) =>
      e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscape);
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <Portal wrapperId="portal">
      <div className={s.modalWrapper}>
        <button onClick={() => handleClose()}>Close</button>
        <div className={s.modalContent}>{children}</div>
      </div>
    </Portal>
  );
}

export default Modal;
