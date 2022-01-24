import React, { Component } from 'react';

export default class Settings extends Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="settings-title">
        Settings
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
