const config = require('../../package.json').proxy;
const BACKEND_BASE_URL = config;

const COUNTRY_FLAG = {
  BASE_URL: `https://countryflagsapi.com/png`,
  STYLE: {FLAT: 'flat', SHINY: 'shiny'},
};

const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  REGISTER: '/register',
  LOGIN: '/login',
  USER_EXIST: '/user-exist',
  USER: '/user',
  REFRESH_TOKEN: '/refresh-token'
};

export default {COUNTRY_FLAG, BACKEND_API};
