import {combineReducers} from "redux"
import { authReducerRegister, authReducerSignIn } from "./authReducer"
import { cartReducer } from "./cartReducers"
import { orderDetailsReducer, orderListReducer, orderPayReducer, orderReducer } from "./orderReducers"
import { productDetailsReducer,productListReducer } from "./productReducers"


export const rootReducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    authSignIn:authReducerSignIn,
    authRegister:authReducerRegister,
    orderCreate:orderReducer,
    orderDetail:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderList:orderListReducer
})