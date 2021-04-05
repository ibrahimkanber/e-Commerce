import * as ActionTypes from "../action-types";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.ORDER_CREATE_REQUEST,
    payload: order,
  });

  try {
    const {
      authSignIn: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: ActionTypes.ORDER_CREATE_SUCCESS,
      payload: data.order,
    });

    dispatch({
      type: ActionTypes.CART_REMOVE_ALL,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ActionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.ORDER_DETAILS_REQUEST,
    payload: orderId,
  });

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: ActionTypes.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ActionTypes.ORDER_PAY_REQUEST,
    payload: { order, paymentResult },
  });

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(
      `/api/orders/${order._id}/pay`,
      paymentResult,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: ActionTypes.ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const getOrderHistory = () => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.ORDER_HISTORY_LIST_REQUEST });

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get("/api/orders/orderlist", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });


    dispatch({ type: ActionTypes.ORDER_HISTORY_LIST_SUCCESS, payload: data });


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.ORDER_HISTORY_LIST_FAIL,
      payload: message
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.ORDER_ALL_LIST_REQUEST });

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ActionTypes.ORDER_ALL_LIST_SUCCESS, payload: data });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.ORDER_ALL_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.ORDER_DELETE_REQUEST ,payload:id});

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete( `/api/orders/${id}` , {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ActionTypes.ORDER_DELETE_SUCCESS, payload: data });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.ORDER_DELETE_FAIL,
      payload: message,
    });
  }
};


export const deliverOrder = (orderId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ActionTypes.ORDER_DELIVER_REQUEST,
    payload: orderId,
  });

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: ActionTypes.ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

