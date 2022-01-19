import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: JSON.parse(localStorage.getItem('ranking')),
    };
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          <ol>
            {
              ranking
                .sort((a, b) => (b.score - a.score))
                .map(({ name, picture, score }, index) => (
                  <li key={ index }>
                    <img src={ picture } alt="player" />
                    { ' ' }
                    <span data-testid={ `player-name-${index}` }>{ name }</span>
                    { ' ' }
                    <span data-testid={ `player-score-${index}` }>{ score }</span>
                  </li>
                ))
            }
          </ol>
        </section>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => (history.push('/')) }
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
