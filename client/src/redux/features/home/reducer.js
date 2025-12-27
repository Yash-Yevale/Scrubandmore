import {
  GET_DATA_LOADING_HOME,
  GET_DATA_SUCCESS_HOME,
  GET_DATA_ERROR_HOME,
} from "./actionTypes";

const initState = {
  loading: false,
  error: false,
  data: [],
};

export const homeReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_DATA_LOADING_HOME:
      return { ...state, loading: true };

    case GET_DATA_SUCCESS_HOME:
      return { ...state, loading: false, data: payload, error: false };

    case GET_DATA_ERROR_HOME:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
