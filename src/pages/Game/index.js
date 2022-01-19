import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../../components/Header';
import Questions from '../../components/Questions';

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;
