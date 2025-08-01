import s from './Checkbox.module.scss';

export const Checkbox = () => {
  return (
    <div className={s.checkboxWrapper}>
      <input type="checkbox" className={s.checkbox} />
      <label htmlFor="select">Select artwork</label>
    </div>
  );
};
