import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingBox, MessageBox } from "../components";
import { useHistory } from "react-router-dom";
import { useActions } from "../customhooks/useActions";
const OrderHistoryPage = () => {
  const history = useHistory();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const { getOrderHistory } = useActions();

  useEffect(() => {
    getOrderHistory();
  }, [getOrderHistory]);

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => history.push(`/order/${order._id}`)}
                  >Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export { OrderHistoryPage };
