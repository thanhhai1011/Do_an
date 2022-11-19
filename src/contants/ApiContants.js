const config = require('../../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const COUNTRY_FLAG = {
  BASE_URL: `https://countryflagsapi.com/png`,
  STYLE: {FLAT: 'flat', SHINY: 'shiny'},
};

const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  REGISTER: '/register',
  LOGIN: '/login',
};

export default {COUNTRY_FLAG, BACKEND_API};
