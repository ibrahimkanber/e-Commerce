import React, { useEffect, useState } from "react";
import { LoadingBox, MessageBox } from "../components";
import { useSelector,useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useActions } from "../customhooks/useActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../state/action-types";
const OrderDetailPage = () => {
  const [refresh,setRefresh]=useState(true)
  const { id } = useParams();
  const dispatch=useDispatch()
  const orderDetails = useSelector((state) => state.orderDetail);
  const orderPay = useSelector((state) => state.orderPay);

  const errorPay = orderPay.error;
  const successPay = orderPay.success;
  const loadingPay=orderPay.loading

  const { order, loading, error } = orderDetails;

  const [sdkReady, setSdkReady] = useState();

  const { getOrderDetails, payOrder } = useActions();

  const addPayPalScript = async () => {
    const { data } = await axios.get("/api/config/paypal");

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || (order && order._id !== id)) {
      dispatch({type:ORDER_PAY_RESET})
      getOrderDetails(id);
    } else {
      if (!orderDetails?.order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [id, order, sdkReady,successPay]);

  const successPaymentHandler = (paymentResult) => {
    payOrder(order, paymentResult);
    
    console.log(paymentResult)
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>
                  {order.shippingAddress.fullName} <br />
                  <strong>Adress:</strong>
                  {order.shippingAddress.adress},{order.shippingAddress.city} ,
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems?.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} =${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    {" "}
                    <strong>Order Total</strong>{" "}
                  </div>
                  <div>
                    {" "}
                    <strong>${order.totalPrice}</strong>{" "}
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                    {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                    {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OrderDetailPage };
