import s from './Fallback.module.scss';

export const Fallback = () => {
  return (
    <div className={s.fallbackWrapper}>
      <p>Something went wrong</p>
      <p>Please try to reload the page or comeback later</p>
    </div>
  );
};
