import { GET_USER, PLAYER_ASSERTIONS, PLAYER_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
      score: 0,
      assertions: 0,
    };
  case PLAYER_POINTS:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case PLAYER_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  default:
    return state;
  }
};

export default player;
