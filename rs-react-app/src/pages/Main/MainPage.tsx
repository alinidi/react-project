import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import s from './MainPage.module.scss';
import type { RootState } from '../../app/store';
import { uiSlice } from '../../app/uiSlice';
import { Button } from '../../components/Button/Button';
import { UncontrolledForm } from '../../components/UncontrolledForm/UncontrolledForm';
import { ReactHookForm } from '../../components/ReactHookForm/ReactHookForm';
import { useState } from 'react';

function MainPage() {
  const activeModal = useSelector((state: RootState) => state.ui.activeModal);
  const openModal = uiSlice.actions.openModal;
  const closeModal = uiSlice.actions.closeModal;
  const dispatch = useDispatch();
  const [, setIsModalOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const formData = useSelector((state: RootState) => state.formData);
  console.log(formData);

  return (
    <div className={s.mainWrapper} data-testid="mainPage">
      <Button
        onClick={() => {
          dispatch(openModal('first'));
          setIsModalOpen(true);
        }}
      >
        Uncontrolled Form
      </Button>
      <Button
        onClick={() => {
          dispatch(openModal('second'));
          setIsModalOpen(true);
        }}
      >
        React Hook Form
      </Button>
      <Modal
        handleClose={() => dispatch(closeModal())}
        isOpen={activeModal === 'first'}
        children={
          <UncontrolledForm
            onSubmitSuccess={() => {
              dispatch(closeModal());
              setHighlight(true);
              setTimeout(() => setHighlight(false), 3000);
            }}
          />
        }
      />
      <Modal
        handleClose={() => dispatch(closeModal())}
        isOpen={activeModal === 'second'}
        children={
          <ReactHookForm
            onSubmitSuccess={() => {
              dispatch(closeModal());
              setHighlight(true);
              setTimeout(() => setHighlight(false), 3000);
            }}
          />
        }
      />
      {highlight && (
        <div className={`${s.formDataWrapper} ${highlight ? s.highlight : ''}`}>
          <p>{formData.name}</p>
          <p>{formData.age}</p>
          <p>{formData.country}</p>
          <p>{formData.gender}</p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
