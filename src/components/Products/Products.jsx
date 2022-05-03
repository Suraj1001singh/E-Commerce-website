import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

function Products({ products, onAddToCart }) {
  const classes = useStyles();
  // const products = [
  //   { id: 1, name: "shoes", description: "Running Shoes", price: "$30",image:'https://thumbs.dreamstime.com/b/sport-shoes-isolated-white-background-41616578.jpg' },
  //   { id: 1, name: "Macbook", description: "Apple Macbook", price: "$650",image:'https://st1.bgr.in/wp-content/uploads/2020/11/MACBOOK-PRO-final.jpg' },
  // ];
  return (
    <main className={classes.content}>
      {/* this will just add the right amount of pixles as the app bar */}
      <div className={classes.toolbar} />
      <Grid container jutify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}></Product>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
