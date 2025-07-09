import { Component, type ChangeEvent } from 'react';
import type { State } from '../types/types';
import { Header } from './Header/Header';
import { getResults } from '../API/getResults';
import { Artworks } from './Artworks/Artworks';

export class Result extends Component {
  state: State = {
    searchedText: '',
    results: [],
    isLoading: false,
  };

  componentDidMount() {
    this.handleLocalStorage();
  }

  handleLocalStorage = async () => {
    const savedText = localStorage.getItem('searchedText');

    if (savedText) {
      this.setState({ searchedText: savedText });
      const results = await getResults(savedText);
      this.setState({ results });
    } else {
      const results = await getResults(this.state.searchedText);
      this.setState({ results });
    }
  };

  handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchedText: e.currentTarget.value.trim(),
    });
  };

  handleOnClick = async () => {
    const results = await getResults(this.state.searchedText.trim());
    this.setState({ results });
    localStorage.setItem('searchedText', this.state.searchedText.trim());
  };

  render() {
    return (
      <div>
        <Header
          handleOnChange={this.handleOnChange}
          handleOnClick={this.handleOnClick}
          searchedText={this.state.searchedText}
        />
        <Artworks results={this.state.results} />
      </div>
    );
  }
}
