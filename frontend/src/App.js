import { Link, Route } from "react-router-dom";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useSelector } from "react-redux";
import { SignInPage } from "./pages/SignInPage";
import { useActions } from "./customhooks/useActions";
import { Shipping } from "./pages/Shipping";
import {
  OrderDetailPage,
  OrderHistoryPage,
  PaymentPage,
  ProfilePage,
  ProductListPage,
  ProductEditPage,
  OrderListPage,
  UserListPage,
  UserEditPage,
  SellerPage,
  SearchPage,
} from "./pages";
import { PlaceOrderPage } from "./pages";
import { PrivateRoute } from "./components/PrivateRoute";
import { AdminRoute, SearchBox, SellerRoute,LoadingBox,MessageBox } from "./components";
import { useEffect, useState } from "react";
import MapPage from "./pages/MapPage";

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.authSignIn);
  const { signOut, removeAllFromCart, getCategorieList } = useActions();
  const [sidebarIsOpen, setSidebarIsOpen] = useState();

  const signoutHandler = () => {
    signOut();
    removeAllFromCart();
  };

  const categoryInfo = useSelector((state) => state.categoryList);

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryInfo;

  useEffect(() => {
    getCategorieList();
  }, []);

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <button
          type="button"
          className="open-sidebar"
          onClick={()=>setSidebarIsOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
          <Link className="brand" to="/">
            amazona
          </Link>
        </div>
        <div>
          <Route render={({ history }) => <SearchBox history={history} />} />
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

          {userInfo && userInfo.isSeller && (
            <div className="dropdown">
              <Link to="#seller">
                Seller <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/productlist/seller">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Orders</Link>
                </li>
              </ul>
            </div>
          )}

          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
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
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className={sidebarIsOpen ? 'open' : ''}>
        <ul className="categories">
          <li>
            <strong>Categories</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories.map(c=>(
              <li key={c}>
                <Link 
                to={`/search/category/${c}`}
                onClick={()=>setSidebarIsOpen(false)}

                >{c}</Link>
              </li>
            ))
          )
            
          }
        </ul>
      </aside>
      <main>
        <Route exact path="/seller/:id" component={SellerPage} />
        <Route exact path="/cart/:id?" component={CartPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <AdminRoute
          exact
          path="/product/:id/edit"
          component={ProductEditPage}
        />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/placeorder" component={PlaceOrderPage} />
        <Route exact path="/order/:id" component={OrderDetailPage} />
        <Route exact path="/search/name/:name?" component={SearchPage} />

        <Route exact path="/search/category/:category" component={SearchPage} />

        <Route
          exact
          path="/search/category/:category/name/:name"
          component={SearchPage}
        />
        <Route
          exact
          path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
          component={SearchPage}
        />

        <Route exact path="/orderhistory" component={OrderHistoryPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/map" component={MapPage} />
        <AdminRoute exact path="/productlist" component={ProductListPage} />
        <AdminRoute exact path="/orderlist" component={OrderListPage} />
        <AdminRoute exact path="/userlist" component={UserListPage} />
        <AdminRoute exact path="/user/:id/edit" component={UserEditPage} />
        <SellerRoute
          exact
          path="/productlist/seller"
          component={ProductListPage}
        />
        <SellerRoute exact path="/orderlist/seller" component={OrderListPage} />
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
