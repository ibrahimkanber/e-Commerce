import * as ActionTypes from "../action-types";

const initialState = {};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ORDER_CREATE_REQUEST:
      return { loading: true };
    case ActionTypes.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ActionTypes.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ActionTypes.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

const initialStateDetail = {
  loading: true,

};

export const orderDetailsReducer = (state = initialStateDetail, action) => {
  switch (action.type) {
    case ActionTypes.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ActionTypes.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ActionTypes.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ORDER_PAY_REQUEST:
      return { loading: true };
    case ActionTypes.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ActionTypes.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ActionTypes.ORDER_PAY_RESET:
      return  {} ;

    default:
      return state;
  }
};


export const orderListReducer = (state = {orders:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ORDER_HISTORY_LIST_REQUEST:
      return { loading: true };
    case ActionTypes.ORDER_HISTORY_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ActionTypes.ORDER_HISTORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderAllListReducer = (state = {orders:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ORDER_ALL_LIST_REQUEST:
      return { loading: true };
    case ActionTypes.ORDER_ALL_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ActionTypes.ORDER_ALL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
