import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.saveRankingLs();
  }

  saveRankingLs= () => {
    const { score, name, email } = this.props;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking.push({
        name,
        score,
        picture,
      });
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([{
        name,
        score,
        picture,
      }]));
    }
  }

  render() {
    const { score, assertions, history } = this.props;
    const validation = 3;
    return (
      <div>
        <Header />
        <section>
          {
            assertions >= validation
              ? (<h2 data-testid="feedback-text">Well Done!</h2>)
              : (<h2 data-testid="feedback-text">Could be better...</h2>)
          }
          <label htmlFor="pontuação">
            Pontuação
            <h2 data-testid="feedback-total-score" id="pontuação">
              { score }
            </h2>
          </label>
          <label htmlFor="Acertos">
            <h2 data-testid="feedback-total-question" id="Acertos">
              { assertions }
            </h2>
          </label>
        </section>
        <section>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
        </section>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => (history.push('/ranking')) }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
