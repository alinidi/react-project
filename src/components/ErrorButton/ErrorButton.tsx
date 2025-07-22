import { useState } from 'react';
import s from '../../common/Button/Buttons.module.scss';

export const ErrorButton = () => {
  const [isBroken, setIsBroken] = useState(false);

  function handleClick() {
    setIsBroken(true);
  }

  if (isBroken) {
    throw new Error('Crush test');
  }

  return (
    <button className={s.button} onClick={handleClick}>
      Crush test
    </button>
  );
};
