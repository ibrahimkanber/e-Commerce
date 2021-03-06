import axios from "axios";
import * as ActionTypes from "../action-types";

export const getProductList = ({seller="",name="",category="",min=0,max=0,rating=0,order=""}) => async (dispatch) => {
  dispatch({
    type: ActionTypes.PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get( `/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}` );
    dispatch({
      type: ActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  dispatch({
    type: ActionTypes.PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });

  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: ActionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.PRODUCT_CREATE_REQUEST,
  });
  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `/api/products`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: ActionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_CRETATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.PRODUCT_UPDATE_REQUEST,
    payload: product,
  });
  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ActionTypes.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.PRODUCT_DELETE_REQUEST});
  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ActionTypes.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getCategorieList = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get( `/api/products/categories` );
    dispatch({
      type: ActionTypes.PRODUCT_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_CATEGORY_LIST_FAIL,
      payload: error.message,
    });
  }
};




export const createReview= (productId,review) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.PRODUCT_REVIEW_REQUEST,
  });
  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: ActionTypes.PRODUCT_REVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
