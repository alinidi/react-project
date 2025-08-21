'use client';

import { useRouter } from 'next/navigation';
import s from './NotFound.module.scss';
import { Button } from 'common/Button/Button';

export const NotFound = () => {
  const router = useRouter();

  return (
    <div className={s.wrapper}>
      <h1>404</h1>
      <p>Page not found</p>
      <p>We can't find page you were looking for</p>
      <Button handleOnClick={() => router.push('/')}>Back to Home</Button>
    </div>
  );
};
