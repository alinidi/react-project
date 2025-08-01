import { Button } from '../Button/Button';

type FlyoutType = {
  count: number;
};

export const Flyout = (props: FlyoutType) => {
  return (
    <div>
      <p>{props.count} selected</p>
      <div>
        <Button>Unselect all</Button>
        <Button>Download</Button>
      </div>
    </div>
  );
};
