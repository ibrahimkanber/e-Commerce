import axios from "axios";
import * as ActionTypes from "../action-types"

export const signIn = (email, password) => async (dispatch) => {
    dispatch({type:ActionTypes.SIGNIN_REQUEST,payload:{email,password}});
    try {
        const {data}=await axios.post("/api/users/signin",{email,password})
        dispatch({type:ActionTypes.SIGNIN_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:ActionTypes.SIGNIN_FAIL,
            payload:error.response.data.message
        })
    }
};

export const register = (name,email, password) => async (dispatch) => {
    dispatch({type:ActionTypes.REGISTER_REQUEST,payload:{email,password}});
    try {
        const {data}=await axios.post("/api/users/register",{name,email,password})

        dispatch({type:ActionTypes.REGISTER_SUCCESS,payload:data})

        dispatch({type:ActionTypes.SIGNIN_SUCCESS,payload:data})
        
        localStorage.setItem("userInfo",JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:ActionTypes.REGISTER_FAIL,
            payload:error.response.data.message
        })
    }
};
export const signOut = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    dispatch({type:ActionTypes.SIGNOUT})
  
};
