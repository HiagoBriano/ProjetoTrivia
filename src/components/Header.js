import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const {
      userName,
      email,
      score,
    } = this.props;
    const hash = md5(email).toString();
    const imageUrl = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div id="header">
        <img
          data-testid="header-profile-picture"
          src={ imageUrl }
          alt="Imagem do jogador"
        />
        <div className="player-header">
          <h4><center>Jogador:</center></h4>
          <h2 data-testid="header-player-name">{ userName }</h2>
        </div>
        <div className="ponto-header">
          <h4><center>Pontos:</center></h4>
          <h2 data-testid="header-score"><center>{score}</center></h2>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
