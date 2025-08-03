import { Button } from '../Button/Button';
import s from './Flyout.module.scss';

type FlyoutType = {
  count: number;
  handleUnselect: () => void;
  url: string;
};

export const Flyout = (props: FlyoutType) => {
  return (
    <div className={s.flyoutWrapper}>
      <p className={s.info}>Selected: {props.count}</p>
      <div className={s.buttonsWrapper}>
        <Button handleOnClick={props.handleUnselect}>Unselect all</Button>
        <Button>
          <a download={`${props.count}_items.csv`} href={props.url}>
            Download
          </a>
        </Button>
      </div>
    </div>
  );
};
