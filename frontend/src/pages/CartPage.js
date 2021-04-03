import React, { useEffect } from "react";
import { useParams, useLocation, Link,useHistory } from "react-router-dom";
import { useActions } from "../customhooks/useActions";
import { useSelector } from "react-redux";
import { MessageBox } from "../components/";
export const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { id } = useParams();
  const location = useLocation();
  const history=useHistory()
  const { addToCart,removeFromCart } = useActions();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (id) {
      addToCart(id, qty);
    }
  }, [id, qty]);



  const removeFromCartHandler = (id) => {
      removeFromCart(id)
  };

  const checkoutHandler=()=>{
      history.push("/signin?redirect=shipping")
  }

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty.<Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCart(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal({cartItems.reduce((a, c) => a + c.qty, 0)} items :$
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)})
              </h2>
            </li>
            <li>
              <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length===0}>
                Proceed to Checkout
              </button>
            </li>
        
          </ul>
        </div>
      </div>
    </div>
  );
};
