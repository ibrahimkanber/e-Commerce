import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useActions } from "../customhooks/useActions";
import { LoadingBox, MessageBox } from "../components";
import { useHistory } from "react-router-dom";
import { ORDER_DELETE_RESET } from "../state/action-types";


const OrderListPage = (props) => {
  const sellerMode=props.match.path.indexOf("/seller")>=0
  const dispatch=useDispatch()
  const history = useHistory();
  const { getAllOrders,deleteOrder } = useActions();
  const orderList = useSelector((state) => state.allOrders);
  const { loading, error, orders } = orderList;
  const authSignIn = useSelector((state) => state.authSignIn);
  const {userInfo}=authSignIn;

  const orderDeleteInfo=useSelector(state=>state.orderDelete)

  const { loading:loadingDelete, error:errorDelete, success:successDelete } = orderDeleteInfo;

  useEffect(() => {
    getAllOrders({seller: sellerMode? userInfo._id:""});
    dispatch({type:ORDER_DELETE_RESET})
  }, [successDelete,sellerMode,userInfo?._id]);

  const deleteHandler = (order) => {
    if(window.confirm("Are you sure to delete")){
      deleteOrder(order._id)
    }
  };

  return (
    <div>
      <div>
        <h1>Orders</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
                  <td>{order?._id}</td>
                  <td>{order?.user?.name}</td>
                  <td>{order?.createdAt.substring(0, 10)}</td>
                  <td>{order?.totalPrice}</td>
                  <td>{order?.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order?.isDelivered
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
