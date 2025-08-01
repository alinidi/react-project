import s from './Checkbox.module.scss';

type CheckboxType = {
  handleCheckboxChange: (id: number) => void;
  id: number;
  isChecked: boolean;
};

export const Checkbox = (props: CheckboxType) => {
  return (
    <div className={s.checkboxWrapper}>
      <input
        type="checkbox"
        className={s.checkbox}
        onChange={() => props.handleCheckboxChange(props.id)}
        checked={props.isChecked}
      />
      <label htmlFor="select">Select artwork</label>
    </div>
  );
};
