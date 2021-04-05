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