import {ApiContants} from '../contants';

const getFlagIcon = (code = 'VN') =>
  `${ApiContants.COUNTRY_FLAG.BASE_URL}/${code}`;

export default {getFlagIcon};
