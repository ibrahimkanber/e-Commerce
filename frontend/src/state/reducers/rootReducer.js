import { combineReducers } from "redux";
import { authReducerRegister, authReducerSignIn } from "./authReducer";
import { cartReducer } from "./cartReducers";
import {
  orderAllListReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderReducer,
} from "./orderReducers";
import {
  categoryListReducer,
  createProductReducer,
  deleteProductReducer,
  productDetailsReducer,
  productListReducer,
  updateProductReducer,
  createPoductReviewReducer
} from "./productReducers";
import {
  updateUserFromAdminReducer,
  updateUserProfileReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userTopSellerListReducer,
} from "./userReducer";

export const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  authSignIn: authReducerSignIn,
  authRegister: authReducerRegister,
  orderCreate: orderReducer,
  orderDetail: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  userDetails: userDetailsReducer,
  updateUserProfile: updateUserProfileReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  allOrders: orderAllListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:updateUserFromAdminReducer,
  userTopSellersList:userTopSellerListReducer,
  categoryList:categoryListReducer,
  createProductReview:createPoductReviewReducer,
  userAddressMap:userDetailsReducer
});
