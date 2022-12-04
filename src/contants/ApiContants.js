const config = require('../../package.json').proxy;
const BACKEND_BASE_URL = config;

const COUNTRY_FLAG = {
  BASE_URL: `https://countryflagsapi.com/png`,
  STYLE: {FLAT: 'flat', SHINY: 'shiny'},
};

const STATIC_IMAGE = {
  BASE_URL: `${BACKEND_BASE_URL}/images`,
  TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
  SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
  QUALITY: {SD: 'sd', HD: 'hd'},
};

const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  REGISTER: '/register',
  LOGIN: '/login',
  USER_EXIST: '/user-exist',
  USER: '/user',
  REFRESH_TOKEN: '/refresh-token',
  RESTAURANT: '/restaurant'
};

export default {COUNTRY_FLAG, BACKEND_API, STATIC_IMAGE};
