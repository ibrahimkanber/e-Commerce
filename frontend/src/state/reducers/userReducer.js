import * as ActionTypes from "../action-types";

export const userDetailsReducer=(state={loading:true},action)=>{

    switch (action.type) {
        case ActionTypes.USER_DETAIL_REQUEST:

            return {loading:true,}
        case ActionTypes.USER_DETAIL_SUCCESS:

            return {loading:false,user:action.payload}  

        case ActionTypes.USER_DETAIL_FAIL:
            return {loading:false,error:action.payload}
    
        default:
            return state;
    }
}
export const updateUserProfileReducer=(state={},action)=>{

    switch (action.type) {
        case ActionTypes.USER_UPDATE_PROFILE_REQUEST:

            return {loading:true,}
        case ActionTypes.USER_UPDATE_SUCCESS:

            return {loading:false,success:true}  

        case ActionTypes.USER_UPDATE_FAIL:
            return {loading:false,error:action.payload}

        case ActionTypes.USER_UPDATE_RESET:
            return {}
    
        default:
            return state;
    }
}