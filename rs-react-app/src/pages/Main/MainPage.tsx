import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import s from './MainPage.module.scss';
import type { RootState } from '../../app/store';
import { uiSlice } from '../../app/uiSlice';
import { Button } from '../../components/Button/Button';
import { UncontrolledForm } from '../../components/UncontrolledForm/UncontrolledForm';
import { ReactHookForm } from '../../components/ReactHookForm/ReactHookForm';

function MainPage() {
  const activeModal = useSelector((state: RootState) => state.ui.activeModal);
  const openModal = uiSlice.actions.openModal;
  const closeModal = uiSlice.actions.closeModal;
  const dispatch = useDispatch();

  return (
    <div className={s.mainWrapper}>
      <Button onClick={() => dispatch(openModal('first'))}>Modal 1</Button>
      <Button onClick={() => dispatch(openModal('second'))}>Modal 2</Button>
      <Modal
        handleClose={() => dispatch(closeModal())}
        isOpen={activeModal === 'first'}
        children={<UncontrolledForm />}
      />
      <Modal
        handleClose={() => dispatch(closeModal())}
        isOpen={activeModal === 'second'}
        children={<ReactHookForm />}
      />
    </div>
  );
}

export default MainPage;
