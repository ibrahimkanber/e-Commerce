import * as ActionTypes from "../action-types"

const initialState_productList={
    products:[],
    
}
export const productListReducer=(state=initialState_productList,action)=>{
    switch (action.type) {
        case ActionTypes.PRODUCT_LIST_REQUEST:
            return {loading:true};
        case ActionTypes.PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload,error:false};
        case ActionTypes.PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload,products:[]};
        default:
            return state ;
    }
}



const initialState_productDetails={
    loading:true,
}


export const productDetailsReducer=(state=initialState_productDetails,action)=>{
    switch (action.type) {
        case  ActionTypes.PRODUCT_DETAILS_REQUEST:
            return {loading:true,error:false,product:{}}

        case  ActionTypes.PRODUCT_DETAILS_SUCCESS:
            return {loading:false,error:false,product:action.payload}

        case ActionTypes.PRODUCT_FAIL:
            return {loading:false,error:action.payload,product:{}} 
    
        default:
            return state;
    }
}

export const createProductReducer=(state={},action)=>{
    switch (action.type) {
        case  ActionTypes.PRODUCT_CREATE_REQUEST:
            return {loading:true}

        case  ActionTypes.PRODUCT_CREATE_SUCCESS:
            return {loading:false,success:true,product:action.payload}

        case ActionTypes.PRODUCT_FAIL:
            return {loading:false,error:action.payload} 

        case ActionTypes.PRODUCT_CRETATE_RESET:
            return {} 
    
        default:
            return state;
    }
}

export const updateProductReducer=(state={},action)=>{
    switch (action.type) {
        case  ActionTypes.PRODUCT_UPDATE_REQUEST:
            return {loading:true}

        case  ActionTypes.PRODUCT_CREATE_SUCCESS:
            return {loading:false,success:true}

        case ActionTypes.PRODUCT_FAIL:
            return {loading:false,error:action.payload} 

        case ActionTypes.PRODUCT_UPDATE_RESET:
            return {} 
    
        default:
            return state;
    }
}

export const deleteProductReducer=(state={},action)=>{
    switch (action.type) {
        case  ActionTypes.PRODUCT_DELETE_REQUEST:
            return {loading:true}

        case  ActionTypes.PRODUCT_DELETE_SUCCESS:
            return {loading:false,success:true}

        case ActionTypes.PRODUCT_DELETE_FAIL:
            return {loading:false,error:action.payload} 
    
        case ActionTypes.PRODUCT_DELETE_RESET:
            return {} 
    
        default:
            return state;
    }
}