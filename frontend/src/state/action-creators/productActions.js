import axios from "axios"
import * as ActionTypes from "../action-types"


export const getProductList=()=>async(dispatch)=>{
    
    dispatch({
        type:ActionTypes.PRODUCT_LIST_REQUEST
    })
    try {
        const { data } = await axios.get("/api/products");
        dispatch({
            type:ActionTypes.PRODUCT_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ActionTypes.PRODUCT_LIST_FAIL,
            payload:error.message
        })
    }
}


export const getProductDetails=(productId)=>async(dispatch)=>{

    dispatch({
        type:ActionTypes.PRODUCT_DETAILS_REQUEST,payload:productId
    })

    try {
        const { data } = await axios.get( `/api/products/${productId}`);
        dispatch({type:ActionTypes.PRODUCT_DETAILS_SUCCESS,payload:data})
    } catch (error) {
       
        dispatch({type:ActionTypes.PRODUCT_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message:
            error.message
        
        })
        
    }
}