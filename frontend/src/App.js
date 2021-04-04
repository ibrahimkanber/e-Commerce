import { Link, Route } from "react-router-dom";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useSelector } from "react-redux";
import { SignInPage } from "./pages/SignInPage";
import { useActions } from "./customhooks/useActions";
import { Shipping } from "./pages/Shipping";
import { OrderDetailPage, OrderHistoryPage, PaymentPage } from "./pages";
import { PlaceOrderPage } from "./pages";
function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.authSignIn);
  const { signOut, removeAllFromCart } = useActions();

  const signoutHandler = () => {
    signOut();
    removeAllFromCart();
  };

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            amazona
          </Link>
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name}
                <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="/" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </header>
      <main>
        <Route exact path="/cart/:id?" component={CartPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/placeorder" component={PlaceOrderPage} />
        <Route exact path="/order/:id" component={OrderDetailPage} />
        <Route exact path="/orderhistory" component={OrderHistoryPage} />
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
