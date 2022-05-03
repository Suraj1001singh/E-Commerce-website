import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";

function CartItem({ item, handelUpdateCartQty, handelRemoveFromCart }) {
  const classes = useStyles();
  return (
    <>
      <Card>
        <CardMedia
          image={item.media.source}
          alt={item.name}
          className={classes.media}
        ></CardMedia>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography varient="h5" gutterBottom>
              {item.name}
            </Typography>
            <Typography varient="h5" gutterBottom>
              {item.line_total.formatted_with_symbol}
            </Typography>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Button
              type="button"
              size="small"
              onClick={() => handelUpdateCartQty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography> {item.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={() => handelUpdateCartQty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <IconButton
            aria-label="Remove Item"
            onClick={() => handelRemoveFromCart(item.id)}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default CartItem;
