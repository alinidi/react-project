import { Component } from 'react';
import s from './Artworks.module.scss';
import type { SearchedResults } from '../../types/types';

export class Artworks extends Component<SearchedResults> {
  render() {
    return (
      <div className={s.artworksWrapper}>
        {this.props.results.map((result) => {
          return (
            <div key={result.id} className={s.art}>
              <h2 className={s.title}>
                {result.title}, {result.date_end}
              </h2>
              <p className={s.artist}>{result.artist_display}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
