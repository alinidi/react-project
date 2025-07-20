import { Component } from 'react';
import s from './Artworks.module.scss';
import type { SearchedResults } from '../../types/types';

export class Artworks extends Component<SearchedResults> {
  render() {
    return (
      <div data-testid="artworks" className={s.artworksWrapper}>
        {this.props.results.map((result) => {
          return (
            <div key={result.id} className={s.art}>
              <img src={result.imageUrl} alt={result.title} />
              <div className={s.description}>
                <h2 className={s.title}>
                  {result.title}, {result.date_end}
                </h2>
                <p className={s.artist}>{result.artist_display}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
