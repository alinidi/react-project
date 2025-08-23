import s from './Input.module.scss';

type InputType = {
  id?: string;
  type: string;
  name: string;
  htmlFor?: string;
  placeholder?: string;
  children?: string;
};

export const Input = ({
  id,
  type,
  name,
  htmlFor,
  placeholder,
  children,
}: InputType) => {
  return (
    <div className={s.inputWrapper}>
      <label htmlFor={htmlFor}>{children}</label>
      <input id={id} type={type} name={name} placeholder={placeholder} />
    </div>
  );
};
