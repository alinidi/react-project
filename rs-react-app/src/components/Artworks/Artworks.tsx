import { Component } from 'react';
import s from './Artworks.module.scss';
import type { SearchedResults } from '../../types/types';

export class Artworks extends Component<SearchedResults> {
  render() {
    return (
      <div className={s.artworksWrapper}>
        {this.props.results.map((result) => {
          return (
            <div key={result.id}>
              <h2>{result.title}</h2>
              <h3>{result.artist_display}</h3>
            </div>
          );
        })}
      </div>
    );
  }
}
