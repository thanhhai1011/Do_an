import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getBills = async () => {
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.BILL}/`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Bill data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Bill data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Bill data not found`,
    };
  }
};

const addBill = async (cart) => {
  console.log('data: ', cart);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.BILL}/addBill`,
      cart,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Bill added successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Bill adding failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Bill adding failed`,
    };
  }
};

const removeAllCart = async () => {
  try {
    let response = await axios.delete(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CART}/removeAllCart`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item removed all cart successfully`,
      };
    } else {
      return {
        status: false,
        message: `Item removed from failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Item removed from failed`,
    };
  }
};

export default {addBill, removeAllCart, getBills};
