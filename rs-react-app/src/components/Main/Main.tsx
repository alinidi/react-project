import { Component, type ChangeEvent } from 'react';
import type { MainState } from '../../types/types';
import { Header } from '../Header/Header';

export class Main extends Component {
  state: MainState = {
    searchedText: '',
    results: [],
    isLoading: false,
  };

  componentDidMount(): void {
    this.handleLocalStorage();
  }

  handleLocalStorage = () => {
    const savedText = localStorage.getItem('searchedText');
    if (savedText) {
      this.setState({
        searchedText: savedText,
      });
    }
  };

  handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchedText: e.currentTarget.value,
    });
  };

  handleOnClick = () => {
    localStorage.setItem('searchedText', this.state.searchedText);
    console.log('Clicked and saved', localStorage.getItem('searchedText'));
  };

  render() {
    return (
      <Header
        handleOnChange={this.handleOnChange}
        handleOnClick={this.handleOnClick}
        searchedText={this.state.searchedText}
      />
    );
  }
}
