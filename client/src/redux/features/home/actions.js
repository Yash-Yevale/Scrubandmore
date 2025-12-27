import {
  GET_DATA_LOADING_HOME,
  GET_DATA_SUCCESS_HOME,
  GET_DATA_ERROR_HOME,
} from "./actionTypes";

import api from "../../../utils/axios";

export const getDataLoadingHome = () => ({ type: GET_DATA_LOADING_HOME });

export const getDataSuccessHome = (payload) => ({
  type: GET_DATA_SUCCESS_HOME,
  payload,
});

export const getDataErrorHome = () => ({ type: GET_DATA_ERROR_HOME });

export const getHomeData = (path) => async (dispatch) => {
  try {
    dispatch(getDataLoadingHome());

    const { data } = await api.get(path);

    dispatch(getDataSuccessHome(data));
  } catch (err) {
    console.log(err);
    dispatch(getDataErrorHome());
  }
};
