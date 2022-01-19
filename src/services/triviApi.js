import { getToken } from '../redux/actions';

export const requestTriviaApi = async () => {
  const link = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(link);
  const response = await request.json();

  localStorage.setItem('token', response.token);
  return response.token;
};

const fetchQuestionsAPi = async (token) => {
  const link = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(link);
  const response = await request.json();

  return response;
};

export const requestQuestionsApi = async (token) => {
  const ERROR_CODE_3 = 3;

  const response = await fetchQuestionsAPi(token);

  if (response.response_code === ERROR_CODE_3) {
    const request = await requestTriviaApi();
    getToken(request);
    const newApiResult = await requestQuestionsApi(request);
    return newApiResult;
  }

  return response;
};
