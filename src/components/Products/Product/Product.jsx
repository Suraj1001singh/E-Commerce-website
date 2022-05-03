import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import useStyles from "./styles";
import { AddShoppingCart } from "@material-ui/icons";

function Product({ product, onAddToCart }) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={product.media.source}
          title={product.name}
        ></CardMedia>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography varient="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography varient="h5" gutterBottom>
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography
            // for setting inner html as the html code
            dangerouslySetInnerHTML={{ __html: product.description }}
            varient="body2"
            color="textSecondary"
          />
        </CardContent>
        <CardActions disableSpacing classsName={classes.cardActions}>
          <IconButton
            aria-label="Add to Cart"
            onClick={() => onAddToCart(product.id, 1)}
          >
            {/* Adding icon  */}
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default Product;
