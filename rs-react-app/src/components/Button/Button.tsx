import s from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={() => onClick()} className={s.button}>
      {children}
    </button>
  );
};
