import * as ActionTypes from "../action-types";

export const userDetailsReducer=(state={loading:true},action)=>{

    switch (action.type) {
        case ActionTypes.USER_DETAIL_REQUEST:

            return {loading:true,}
        case ActionTypes.USER_DETAIL_SUCCESS:

            return {loading:false,user:action.payload}  

        case ActionTypes.USER_DETAIL_FAIL:
            return {loading:false,error:action.payload}
        case ActionTypes.USER_DETAIL_RESET:
            return {loading:true}
    
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

export const userListReducer=(state={loading:true},action)=>{

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


export const userDeleteReducer=(state={},action)=>{

    switch (action.type) {
        case ActionTypes.USER_DELETE_REQUEST:

            return {loading:true}
        case ActionTypes.USER_DELETE_SUCCESS:

            return {loading:false,success:true}  

        case ActionTypes.USER_DELETE_FAIL:
            return {loading:false,error:action.payload}

        case ActionTypes.USER_DELETE_RESET:
            return {}
    
        default:
            return state;
    }
}


export const updateUserFromAdminReducer=(state={},action)=>{

    switch (action.type) {
        case ActionTypes.USER_UPDATE_FROM_ADMIN_REQUEST:

            return {loading:true,}
        case ActionTypes.USER_UPDATE_FROM_ADMIN_SUCCESS:

            return {loading:false,success:true}  

        case ActionTypes.USER_UPDATE_FROM_ADMIN_FAIL:
            return {loading:false,error:action.payload}

        case ActionTypes.USER_UPDATE_FROM_ADMIN_RESET:
            return {}
    
        default:
            return state;
    }
}


export const userTopSellerListReducer=(state={loading:true},action)=>{

    switch (action.type) {
        case ActionTypes.USER_TOP_SELLER_LIST_REQUEST:

            return {loading:true}
        case ActionTypes.USER_TOP_SELLER_LIST_SUCCESS:

            return {loading:false,users:action.payload}  

        case ActionTypes.USER_TOP_SELLER_LIST_FAIL:
            return {loading:false,error:action.payload}

        case ActionTypes.USER_TOP_SELLER_LIST_RESET:
            return {}
    
        default:
            return state;
    }
}

export const userAddressMapReducer=(state={},action)=>{

    switch (action.type) {
        case ActionTypes.USER_ADDRESS_MAP_CONFIRM:
            return {address:action.payload}

        default:
            return state;
    }
}

