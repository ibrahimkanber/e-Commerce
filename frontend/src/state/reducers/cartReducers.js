import * as ActionTypes from "../action-types";

const initialState_cart = {
  cartItems: [],
  shippingAddress:""
};
export const cartReducer = (state = initialState_cart, action) => {
  switch (action.type) {
    case ActionTypes.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case ActionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case ActionTypes.CART_REMOVE_ALL:
      return {cartItems:[]};
    case ActionTypes.CART_SAVE_SHIPPING_ADDRESS:

      return {...state,shippingAddress:action.payload};
    case ActionTypes.CART_SAVE_PAYMENT_METHOD:

      return {...state,paymentMethod:action.payload};

    default:
      return state;
  }
};
