import { Button } from '../Button/Button';
import s from './Flyout.module.scss';

type FlyoutType = {
  count: number;
  handleUnselect: () => void;
};

export const Flyout = (props: FlyoutType) => {
  return (
    <div className={s.flyoutWrapper}>
      <p className={s.info}>Selected: {props.count}</p>
      <div className={s.buttonsWrapper}>
        <Button handleOnClick={props.handleUnselect}>Unselect all</Button>
        <Button>Download</Button>
      </div>
    </div>
  );
};
