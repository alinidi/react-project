import { Component } from 'react';
import s from './Error.module.scss';
import type { ErrorProps } from '../../types/types';

export class Error extends Component<ErrorProps> {
  render() {
    return (
      <div className={s.errorWrapper}>
        <p>{this.props.error}</p>
      </div>
    );
  }
}
