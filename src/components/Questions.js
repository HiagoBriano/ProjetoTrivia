import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken, playerAssertions, playerPoints } from '../redux/actions';
import { requestQuestionsApi } from '../services/triviApi';
import './Questions.css';

const validation = 'correct-answer';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: ['a'],
      atualQuestion: 0,
      counter: 0,
      resposta: false,
      timer: 30,
      btnDisabled: false,
      misturado: [],
      haveOptions: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
    this.startTimer();
  }

  startTimer = () => {
    const ONE_SECOND = 1000;
    this.counter = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({
          timer: timer - 1,
        });
      }
      if (timer === 0) {
        this.stopTimer();
      }
    }, ONE_SECOND);
  }

  stopTimer = () => {
    this.setState({ resposta: true, btnDisabled: true });
    clearInterval(this.counter);
  }

  getQuestions = async () => {
    const { token } = this.props;
    const apiResult = await requestQuestionsApi(token);

    this.setState({
      questions: apiResult.results,
      haveOptions: true,
    });
    const { questions, counter } = this.state;

    this.prepareAnswers(questions[counter].correct_answer,
      questions[counter].incorrect_answers);
    this.setState({
      questions: apiResult.results,
      haveOptions: true,
    });
  }

  answerSelected = ({ target }) => {
    this.setState({
      resposta: true,
    });
    if (target.name === validation) {
      this.playerScore();
    }
    this.stopTimer();
  }

  nextQuestion = () => {
    const { questions, atualQuestion } = this.state;
    const { history } = this.props;
    if (atualQuestion < (questions.length - 1)) {
      this.setState((prevState) => ({
        atualQuestion: prevState.atualQuestion + 1,
        counter: prevState.counter + 1,
        resposta: false,
        timer: 30,
        btnDisabled: false,
      }), () => {
        const { counter } = this.state;
        this.prepareAnswers(questions[counter].correct_answer,
          questions[counter].incorrect_answers);
      });
      this.renderAnswers();
      this.startTimer();
    } else {
      history.push('/feedback');
    }
  }

  embaralhar = (arr) => {
    // função do site: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  prepareAnswers = (correct = '', incorrects = []) => {
    const respostas = [...incorrects, correct];

    const pronto = respostas.map((atual, index) => (
      ((respostas.length - 1) === index)
        ? {
          resposta: atual,
          certa: true,
          classe: 'buttonGreen',
        }
        : {
          resposta: atual,
          certa: false,
          classe: 'buttonRed',
        }
    ));

    const embaralhado = this.embaralhar(pronto);
    this.setState({ misturado: embaralhado });
  }

  renderAnswers = () => {
    const {
      questions,
      counter,
      misturado,
      resposta,
      btnDisabled,
    } = this.state;

    return (
      <div className="pag-questions">
        <h2 data-testid="question-category">{questions[counter].category}</h2>
        <h3 data-testid="question-text">{questions[counter].question}</h3>
        <section data-testid="answer-options">
          {misturado.map((item, index) => (
            <button
              key={index}
              type="button"
              name={
                item.certa ? validation : `wrong-answer-${index}`
              }
              data-testid={
                item.certa ? validation : `wrong-answer-${index}`
              }
              disabled={btnDisabled}
              className={resposta ? item.classe : ''}
              onClick={
                (e) => this.answerSelected(e)
              }
            >
              {item.resposta}
            </button>
          ))}
        </section>
      </div>
    );
  }

  playerScore() {
    const { questions, counter, timer } = this.state;
    const { setPoints, setAssertions } = this.props;
    let levelQuestion = 0;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const ten = 10;
    if (questions[counter].difficulty === 'easy') {
      levelQuestion = easy;
    } else if (questions[counter].difficulty === 'medium') {
      levelQuestion = medium;
    } else {
      levelQuestion = hard;
    }
    const mathPoint = ten + (levelQuestion * timer);

    setPoints(mathPoint);
    setAssertions(1);
  }

  render() {
    const {
      resposta,
      haveOptions,
      timer,
    } = this.state;

    return (
      <section>
        {!haveOptions
          ? (<p>Carregando</p>)
          : (this.renderAnswers())}
        {resposta
          && (
            <section>
              <button
                type="button"
                data-testid="btn-next"
                onClick={this.nextQuestion}
              >
                Next
              </button>
            </section>
          )}


        {timer <= 30 && timer && !resposta
          ? (
            <div class="circular">
              <div class="inner"></div>
              <div class="outer"></div>
              <div class="numb">
                {timer}
              </div>
              <div class="circle">
                <div class="dot">
                  <span></span>
                </div>
                <div class="bar left">
                  <div class="progress"></div>
                </div>
                <div class="bar right">
                  <div class="progress"></div>
                </div>
              </div>
            </div>
          ) : (
            <div class="circular danger">
              <div class="inner"></div>
              <div class="outer"></div>
              <div class="numb">
                {timer}
              </div>
            </div>
          )

        }

      </section>
    );
  }
}

Questions.propTypes = {
  setToken: PropTypes.func,
  token: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch(getToken(payload)),
  setPoints: (payload) => dispatch(playerPoints(payload)),
  setAssertions: (payload) => dispatch(playerAssertions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
