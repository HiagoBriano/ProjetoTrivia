export const GET_TOKEN = 'GET_TOKEN';
export const GET_USER = 'GET_USER';
export const PLAYER_POINTS = 'PLAYER_POINT';
export const PLAYER_ASSERTIONS = 'PLAYER_ASSERTIONS';

export function getToken(payload) {
  return {
    type: GET_TOKEN,
    payload,
  };
}

export function getUser(name, email) {
  return {
    type: GET_USER,
    name,
    email,
  };
}

export function playerPoints(payload) {
  return {
    type: PLAYER_POINTS,
    payload,
  };
}

export function playerAssertions(payload) {
  return {
    type: PLAYER_ASSERTIONS,
    payload,
  };
}
