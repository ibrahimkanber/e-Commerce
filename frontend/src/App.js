import { Link, Route } from "react-router-dom";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useSelector } from "react-redux";
import { SignInPage } from "./pages/SignInPage";
import { useActions } from "./customhooks/useActions";
import { Shipping } from "./pages/Shipping";
import { OrderDetailPage, OrderHistoryPage, PaymentPage, ProfilePage,ProductListPage,ProductEditPage } from "./pages";
import { PlaceOrderPage } from "./pages";
import { PrivateRoute } from "./components/PrivateRoute";
import { AdminRoute } from "./components";

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
                  <Link to="/profile">User Profile</Link>
                </li>
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

          {
            userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userist">Users</Link>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
      </header>
      <main>
        <Route exact path="/cart/:id?" component={CartPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <AdminRoute exact path="/product/:id/edit" component={ProductEditPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/placeorder" component={PlaceOrderPage} />
        <Route exact path="/order/:id" component={OrderDetailPage} />
        <Route exact path="/orderhistory" component={OrderHistoryPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <AdminRoute exact path="/productlist" component={ProductListPage} />
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
