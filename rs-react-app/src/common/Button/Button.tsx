import { Component } from 'react';
import s from './Buttons.module.scss';

export class Button extends Component {
  render() {
    return <button className={s.button}>Search</button>;
  }
}
