import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

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
      <div className="ranking-div">
        <h1 data-testid="ranking-title">
          <center>Ranking</center>
        </h1>
        <section className="ranking-section">
          <ol className="ranking-lista">
            {ranking
              .sort((a, b) => b.score - a.score)
              .map(({ name, picture, score }, index) => (
                <li key={index} className="ranking-jogador">
                  <div className='tamanho-ranking'>
                    {
                      index === 0
                      ? <img src='https://www.showdomilhao.com.br/static/media/primeiro.4ca9d46c.webp' />
                      : null
                    }
                    {
                      index === 1
                      ? <img src='https://www.showdomilhao.com.br/static/media/segundo.b6d2518e.webp' />
                      : null
                    }
                    {
                      index === 2
                      ? <img src='https://www.showdomilhao.com.br/static/media/terceiro.f53712d5.webp' />
                      : null
                    }
                    {
                      index > 2
                      ? <span>{`${index + 1}°`}</span>
                      : null
                    }
                    {/* <span>{`${index + 1}°`}</span> */}
                  </div>
                  <div className='tamanho-ranking'>
                    <img
                      src={picture}
                      alt="player"
                      className="ranking-foto"
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div className='tamanho-ranking'>
                    <span data-testid={`player-name-${index}`}>{name}</span>
                  </div>
                  <div className='tamanho-ranking'>
                    <span data-testid={`player-score-${index}`}>{score}</span>
                  </div>
                </li>
              ))}
          </ol>
        </section>
        <center>
          <a
            data-testid="btn-go-home"
            type="button"
            onClick={() => history.push('/')}
            className='ranking-botao'
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <center>Inicio</center>
          </a>
        </center>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
