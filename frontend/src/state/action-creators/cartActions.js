import axios from "axios";
import * as ActionTypes from "../action-types";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);

  dispatch({
    type: ActionTypes.CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      seller:data.seller,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.CART_REMOVE_ITEM,
    payload: productId,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeAllFromCart = () => {
  return {
    type: ActionTypes.CART_REMOVE_ALL,
  };
};

export const saveShippingAdress = (data) =>(dispatch)=> {

  dispatch({
    type:ActionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload:data
  })

  localStorage.setItem("shippingAddress",JSON.stringify(data))

};

export const savePaymentMethod = (data) =>(dispatch)=> {

  dispatch({
    type:ActionTypes.CART_SAVE_PAYMENT_METHOD,
    payload:data
  })


};
