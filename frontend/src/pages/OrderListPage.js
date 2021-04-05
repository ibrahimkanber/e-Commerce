import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../customhooks/useActions";
import { LoadingBox, MessageBox } from "../components";
import { useHistory } from "react-router-dom";

const OrderListPage = () => {
    
  const history = useHistory();
  const { getAllOrders } = useActions();
  const orderList = useSelector((state) => state.allOrders);
  const { loading, error, orders } = orderList;
  console.log(orders)
  useEffect(() => {
    getAllOrders();
  }, []);

  const deleteHandler = (order) => {};

  return (
    <div>
      <div>
        <h1>Orders History</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
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
                  <td>{order.user.name}</td>
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
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export { OrderListPage };
