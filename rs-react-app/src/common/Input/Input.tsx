import { Component } from 'react';
import s from './Input.module.scss';

export class Input extends Component {
  render() {
    return <input className={s.input} type="text" placeholder="Search...." />;
  }
}
