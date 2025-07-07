import { Component, type ReactNode } from 'react';
import s from './Header.module.scss';
import logo from './../../assets/logo.svg';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';

export class Header extends Component {
  render(): ReactNode {
    return (
      <div className={s.headerWrapper}>
        <img className={s.logo} src={logo} alt="logo" />
        <div className={s.searchWrapper}>
          <Input />
          <Button />
        </div>
      </div>
    );
  }
}
