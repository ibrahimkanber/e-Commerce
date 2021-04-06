import axios from "axios";
import * as ActionTypes from "../action-types";

export const getUserDetail = (userId) => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.USER_DETAIL_REQUEST, payload: userId });

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
        type:ActionTypes.USER_DETAIL_SUCCESS,
        payload:data
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.USER_DETAIL_FAIL,
      payload: message,
    });
  }
};


export const updateUserProfile=(user)=>async(dispatch,getState)=>{

  dispatch({
    type:ActionTypes.USER_UPDATE_PROFILE_REQUEST,
    payload:user
  })

  const {authSignIn:{userInfo}}=getState()

  console.log(user)

  try {
    
    const { data } = await axios.put(`/api/users/profile`,user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    console.log(data)
    dispatch({
      type:ActionTypes.USER_UPDATE_SUCCESS,
      payload:data
    })
    dispatch({
      type:ActionTypes.SIGNIN_SUCCESS,
      payload:data
    })

    localStorage.setItem("userInfo",JSON.stringify(data))

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.USER_UPDATE_FAIL,
      payload: message,
    });
  }


}


export const getUserList = () => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.USER_LIST_REQUEST });

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
        type:ActionTypes.USER_LIST_SUCCESS,
        payload:data
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.USER_LIST_FAIL,
      payload: message,
    });
  }
};


export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.USER_DELETE_REQUEST });

  const {
    authSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
        type:ActionTypes.USER_DELETE_SUCCESS,
        payload:data
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.USER_DELETE_FAIL,
      payload: message,
    });
  }
};


export const updateUserFromAdmin=(user)=>async(dispatch,getState)=>{
  
  dispatch({
    type:ActionTypes.USER_UPDATE_FROM_ADMIN_REQUEST,
    payload:user
  })

  const {authSignIn:{userInfo}}=getState()

  try {
    console.log(user)
    const { data } = await axios.put(`/api/users/${user._id}`,user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    
    dispatch({
      type:ActionTypes.USER_UPDATE_FROM_ADMIN_SUCCESS,
      payload:data
    })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ActionTypes.USER_UPDATE_FROM_ADMIN_FAIL,
      payload: message,
    });
  }


}