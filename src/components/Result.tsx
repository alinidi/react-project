import { Component, type ChangeEvent } from 'react';
import type { State } from '../types/types';
import { Header } from './Header/Header';
import { getResults } from '../API/getResults';
import { Artworks } from './Artworks/Artworks';
import s from './Results.module.scss';
import { getFriendlyErrorMessage } from '../helper/getUserFriendlyErrorMessages';
import { Error } from '../common/Error/Error';

export class Result extends Component {
  state: State = {
    searchedText: '',
    results: [],
    isLoading: false,
    error: '',
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await this.handleLocalStorage();
    this.setState({ isLoading: false });
  };

  handleLocalStorage = async () => {
    const savedText = localStorage.getItem('searchedText');

    try {
      if (savedText) {
        this.setState({ searchedText: savedText });
        const results = await getResults(savedText);
        this.setState({ results });
      } else {
        const results = await getResults(this.state.searchedText);
        this.setState({ results });
      }
    } catch (error) {
      this.setState({
        error: getFriendlyErrorMessage(error),
        isLoading: false,
      });
    }
  };

  handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchedText: e.currentTarget.value.trim(),
    });
  };

  handleOnClick = async () => {
    this.setState({ isLoading: true, error: '' });

    try {
      const results = await getResults(this.state.searchedText.trim());

      if (results.length === 0) {
        this.setState({ error: 'Nothing found, try another request' });
      }

      this.setState({ results });
      localStorage.setItem('searchedText', this.state.searchedText.trim());
      this.setState({ isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          error: getFriendlyErrorMessage(error),
          isLoading: false,
        });
      }
    }
  };

  render() {
    return (
      <div
        data-testid="result"
        className={this.state.isLoading ? s.loading : ''}
      >
        <Error error={this.state.error} />
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
