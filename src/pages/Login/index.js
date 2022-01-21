import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken, getUser } from '../../redux/actions';
import { requestTriviaApi } from '../../services/triviApi';
import logo from '../../trivia-01.png';
import './Login.css';
import configBtn from './engrenagem3.svg';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: true,
      playerName: '',
      playerEmail: '',
    };
  }

  onChangeHandler = ({ name, value }) => {
    this.setState({
      [name]: value,
    }, () => { this.btnCheck(); });
  }

  btnCheck = () => {
    const regexValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // Referência do Regex: https://regexr.com/3e48o
    const { playerName, playerEmail } = this.state;

    if (playerName.length !== 0 && regexValidation.test(playerEmail)) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  onClickHandler = async () => {
    const { setToken, setUser, history } = this.props;
    const request = await requestTriviaApi();
    await setToken(request);
    const { playerName, playerEmail } = this.state;
    setUser(playerName, playerEmail);
    history.push('/jogo');
  }

  render() {
    const { btnDisabled, playerName, playerEmail } = this.state;
    const { history } = this.props;

    return (
      <div className="login">
        <header className="login--header">
          <img src={ logo } className="login--logo" alt="logo" />
        </header>
        <main className="login--container">
          <form className="login--form">
            <div className="login--form-group">
              <input
                className="login--form-control"
                placeholder="username"
                type="text"
                id="player-name"
                name="playerName"
                data-testid="input-player-name"
                value={ playerName }
                onChange={ (event) => this.onChangeHandler(event.target) }
              />
              <label htmlFor="player-name" className="login--form-label">
                Nome do jogador
              </label>
            </div>
            
            <div className="login--form-group">
              <input
                className="login--form-control"
                placeholder="e-mail"
                type="text"
                id="player-email"
                name="playerEmail"
                data-testid="input-gravatar-email"
                value={ playerEmail }
                onChange={ (event) => this.onChangeHandler(event.target) }
              />
              <label htmlFor="player-email" className="login--form-label">
                E-mail do jogador
              </label>
            </div>

            <button
              type="button"
              className="login--button"
              data-testid="btn-play"
              disabled={ btnDisabled }
              onClick={ () => {
                this.onClickHandler();
              } }
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Play
            </button>

            <button
              className="login--config-btn"
              type="button"
              data-testid="btn-settings"
              onClick={ () => (history.push('/config')) }
            >
              <img src={ configBtn } alt="configuração" title="Configurações" />
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch(getToken(payload)),
  setUser: (name, email) => dispatch(getUser(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
