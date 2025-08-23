import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import s from './MainPage.module.scss';
import type { RootState } from '../../app/store';
import { uiSlice } from '../../app/uiSlice';

function MainPage() {
  const activeModal = useSelector((state: RootState) => state.ui.activeModal);
  const openModal = uiSlice.actions.openModal;
  const closeModal = uiSlice.actions.closeModal;
  const dispatch = useDispatch();

  return (
    <div className={s.mainWrapper}>
      <button onClick={() => dispatch(openModal('first'))}>Modal 1</button>
      <button onClick={() => dispatch(openModal('second'))}>Modal 2</button>
      <Modal
        handleClose={() => dispatch(closeModal())}
        isOpen={activeModal === 'first'}
        children={<h1>Modal1</h1>}
      />
      <Modal
        handleClose={() => dispatch(closeModal())}
        isOpen={activeModal === 'second'}
        children={<h1>Modal2</h1>}
      />
    </div>
  );
}

export default MainPage;
