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

export const userListReducer=(state={},action)=>{

    switch (action.type) {
        case ActionTypes.USER_LIST_REQUEST:

            return {loading:true}
        case ActionTypes.USER_LIST_SUCCESS:

            return {loading:false,users:action.payload}  

        case ActionTypes.USER_LIST_FAIL:
            return {loading:false,error:action.payload}

        case ActionTypes.USER_LIST_RESET:
            return {}
    
        default:
            return state;
    }
}