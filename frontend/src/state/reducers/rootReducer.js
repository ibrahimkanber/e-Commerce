import {combineReducers} from "redux"
import { authReducerRegister, authReducerSignIn } from "./authReducer"
import { cartReducer } from "./cartReducers"
import { productDetailsReducer,productListReducer } from "./productReducers"


export const rootReducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    authSignIn:authReducerSignIn,
    authRegister:authReducerRegister
})