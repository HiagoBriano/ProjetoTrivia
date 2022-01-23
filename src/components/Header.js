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
        <img className="image-user"
          data-testid="header-profile-picture"
          src={imageUrl}
          alt="Imagem do jogador"
        />
        <section className="name-and-score">
          <section className="name-and-score-internal">
            <div className="player-score-header">
              <p>Jogador: {userName} </p>
              <p>Pontos: {score} </p>
            </div>
          </section>
        </section>
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
