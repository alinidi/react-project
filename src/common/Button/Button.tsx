import { Component } from 'react';
import s from './Buttons.module.scss';
import type { ButtonProps } from '../../types/types';

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button className={s.button} onClick={this.props.handleOnClick}>
        {this.props.children}
      </button>
    );
  }
}
