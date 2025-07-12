import { Component } from 'react';
import s from '../../common/Button/Buttons.module.scss';

export class ErrorButton extends Component {
  state = {
    isBroken: false,
  };

  handleClick = () => {
    this.setState({ isBroken: true });
  };

  render() {
    if (this.state.isBroken) {
      throw new Error('Crush test');
    }

    return (
      <button className={s.button} onClick={this.handleClick}>
        Crush test
      </button>
    );
  }
}
