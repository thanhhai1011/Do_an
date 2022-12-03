import axios from 'axios';
import ApiContants from '../contants/ApiContants';
import { getToken } from '../Store';
import {authHeader} from '../utils/Generator';

const getUserData = async () => {
  try {
    let userResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/get-user`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (userResponse?.status === 200) {
      return {
        status: true,
        message: `User data fetched`,
        data: userResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `User data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `User data not found`,
    };
  }
};

export default {getUserData};
