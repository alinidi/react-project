import { Component } from 'react';
import s from './Input.module.scss';
import type { InputProps } from '../../types/types';

export class Input extends Component<InputProps> {
  render() {
    return (
      <input
        className={s.input}
        type="text"
        placeholder="Search...."
        onChange={this.props.handleOnChange}
        value={this.props.searchedText}
      />
    );
  }
}
