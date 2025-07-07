import { Component, type ReactNode } from 'react';
import { Header } from '../Header/Header';
import s from './HeaderContainer.module.scss';

export class HeaderContainer extends Component {
  render(): ReactNode {
    return (
      <div className={s.headerContainer}>
        <Header />
      </div>
    );
  }
}
