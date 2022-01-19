import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken, getUser } from '../../redux/actions';
import { requestTriviaApi } from '../../services/triviApi';
import logo from '../../trivia-01.png';

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
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <label htmlFor="player-name">
              Nome do jogador:
              <input
                type="text"
                id="player-name"
                name="playerName"
                data-testid="input-player-name"
                value={ playerName }
                onChange={ (event) => this.onChangeHandler(event.target) }
              />
            </label>
            <label htmlFor="player-email">
              E-mail do jogador:
              <input
                type="text"
                id="player-email"
                name="playerEmail"
                data-testid="input-gravatar-email"
                value={ playerEmail }
                onChange={ (event) => this.onChangeHandler(event.target) }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ btnDisabled }
              onClick={ () => {
                this.onClickHandler();
              } }
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => (history.push('/config')) }
            >
              Configuração
            </button>
          </form>
        </header>
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
