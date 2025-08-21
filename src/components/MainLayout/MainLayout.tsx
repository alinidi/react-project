import s from './MainLayout.module.scss';
import { Result } from '../Result';

type MainLayoutProps = {
  detailsId?: string;
  children?: React.ReactNode;
  page?: string;
};

export const MainLayout = ({ detailsId, children, page }: MainLayoutProps) => {
  return (
    <div className={s.layout} data-testid="mainLayout">
      <div className={s.result}>
        <Result page={page || '1'} />
      </div>
      {detailsId && <div className={s.details}>{children}</div>}
    </div>
  );
};
