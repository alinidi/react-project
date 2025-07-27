import { Outlet, useParams } from 'react-router';
import s from './MainLayout.module.scss';
import { Result } from '../Result';

export const MainLayout = () => {
  const { detailsId } = useParams();

  return (
    <div className={s.layout} data-testid="mainLayout">
      <div className={s.result}>
        <Result />
      </div>
      {detailsId && (
        <div className={s.details}>
          <Outlet data-testid="outlet" />
        </div>
      )}
    </div>
  );
};
