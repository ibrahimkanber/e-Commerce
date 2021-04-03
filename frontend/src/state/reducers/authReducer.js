import * as ActionTypes from "../action-types";


const initialState={}


export const authReducerSignIn=(state=initialState,action)=>{

    switch (action.type) {
        case ActionTypes.SIGNIN_REQUEST:

            return {loading:true,}
        case ActionTypes.SIGNIN_SUCCESS:

            return {loading:false,userInfo:action.payload}  

        case ActionTypes.SIGNIN_FAIL:
            return {loading:false,error:action.payload}
    
        case ActionTypes.SIGNOUT:
            return {}
        default:
            return state;
    }
}


export const authReducerRegister=(state=initialState,action)=>{

    switch (action.type) {
        case ActionTypes.REGISTER_REQUEST:

            return {loading:true,}
        case ActionTypes.REGISTER_SUCCESS:

            return {loading:false,userInfo:action.payload}  

        case ActionTypes.REGISTER_FAIL:
            return {loading:false,error:action.payload}
    
        default:
            return state;
    }
}