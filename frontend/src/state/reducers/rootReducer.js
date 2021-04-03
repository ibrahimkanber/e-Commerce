import {combineReducers} from "redux"
import { cartReducer } from "./cartReducers"
import { productDetailsReducer,productListReducer } from "./productReducers"


export const rootReducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer
})