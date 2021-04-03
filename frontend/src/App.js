import {Link, Route} from "react-router-dom"
import { CartPage } from "./pages/CartPage";
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import {useSelector} from "react-redux"
function App() {
  const cartItems = useSelector(state => state.cart.cartItems)
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            amazona
          </Link>
        </div>
        <div>
          <Link to="/cart">Cart
          {
            cartItems.length>0 && (
              <span className="badge">{cartItems.length}</span>
            )
          }</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </header>
      <main>
        <Route exact path="/cart/:id?"  component={CartPage}/>
        <Route exact path="/product/:id"  component={ProductPage}/>
        <Route exact path="/"  component={HomePage}/>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  )
}

export default App;
