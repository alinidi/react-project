import { Component } from 'react';
import s from './Header.module.scss';
import logo from './../../assets/logo.svg';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import type { HeaderProps } from '../../types/types';

export class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className={s.headerWrapper}>
        <img className={s.logo} src={logo} alt="logo" />
        <div className={s.searchWrapper}>
          <Input
            handleOnChange={this.props.handleOnChange}
            searchedText={this.props.searchedText}
          />
          <Button handleOnClick={this.props.handleOnClick}>Search</Button>
        </div>
      </div>
    );
  }
}
