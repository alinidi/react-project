import { Outlet, useParams } from 'react-router';
import s from './MainLayout.module.scss';
import { Result } from '../Result';

export const MainLayout = () => {
  const { detailsId } = useParams();

  return (
    <div className={s.layout}>
      <div className={s.result}>
        <Result />
      </div>
      <div className={s.details}>
        {detailsId ? <Outlet /> : <div>Choose smth</div>}
      </div>
    </div>
  );
};
