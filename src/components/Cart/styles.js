import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "2%",
    marginBottom: "3%",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    display: "flex",
    marginTop: "3%",
    marginBottom: "6%",
    width: "100%",
    justifyContent: "space-between",
  },
  container: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "85%",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "60%",
    },
  },
}));
