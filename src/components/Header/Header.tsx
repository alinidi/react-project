import s from './Header.module.scss';
import logo from './../../assets/logo.svg';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import type { HeaderProps } from '../../types/types';
import { Link } from 'react-router';

export const Header = (props: HeaderProps) => {
  return (
    <div className={s.headerWrapper}>
      <img className={s.logo} src={logo} alt="logo" />
      <div className={s.searchWrapper}>
        <Input
          handleOnChange={props.handleOnChange}
          searchedText={props.searchedText}
        />
        <Button handleOnClick={props.handleOnClick}>Search</Button>
        <Link className={s.link} to={'/about'}>
          <Button>About</Button>
        </Link>
      </div>
    </div>
  );
};
