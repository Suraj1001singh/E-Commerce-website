import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import { Link } from "react-router-dom";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

function Cart({
  cart,
  handelUpdateCartQty,
  handelRemoveFromCart,
  handelEmptyCart,
}) {
  const classes = useStyles();

  const EmptyCart = () => (
    <>
      <Typography align="center" variant="subtitle2">
        
        You have no items in your shopping cart,
        <Link to="/" className={classes.link}>
          Start adding some
        </Link>
      </Typography>
      
    </>
  );
  const FilledCart = () => (
    <>
      <Grid container jutify="center" spacing={2}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <CartItem
              item={item}
              handelUpdateCartQty={handelUpdateCartQty}
              handelRemoveFromCart={handelRemoveFromCart}
            ></CartItem>
          </Grid>
        ))}
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handelEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </Grid>
    </>
  );
  // ---to counter the error ...if cmd fails to load the lenght (may be due to poor network)
  if (!cart.line_items) return "Loading....";

  return (
    <Container className={classes.container}>
      <div className={classes.toolbar} />
      <Typography
        align="center"
        variant="h4"
        className={classes.title}
        gutterBottom
      >
        Your Shopping Cart
      </Typography>

      {/* ---this will check whether the cart is empty or not  */}
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
