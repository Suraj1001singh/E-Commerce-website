import "./App.css";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart,Checkout } from "./components";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order,setOrder]=useState({});
  const [errorMessage , setErrorMessage]=useState("");
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchcart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  const handelUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };
  const handelRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };
  const handelEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  const refreshCart=async()=>{
    const newCart= await commerce.cart.refresh();
    setCart(newCart);
  }
  const handleCaptureCheckout= async (CheckoutTokenId,newOrder)=>{
    try{
      const incomingOrder=await commerce.checkout.capture(CheckoutTokenId,newOrder);
      setOrder(incomingOrder);
      refreshCart();
    }catch(error){setErrorMessage(error.data.error.message)};
  }
  useEffect(() => {
    fetchProducts();
    fetchcart();
  }, []);

  console.log("cart details", cart);
  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products
              products={products}
              onAddToCart={handleAddToCart}
            ></Products>
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handelUpdateCartQty={handelUpdateCartQty}
              handelRemoveFromCart={handelRemoveFromCart}
              handelEmptyCart={handelEmptyCart}
            ></Cart>
          </Route>
          <Route exact path='/checkout'>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}></Checkout>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//---Dependencies need to install
// npm install @chec/commerce.js  @material-ui/core @stripe/react-stripe-js @stripe/stripe-js react-router-dom
// react-hook-form
