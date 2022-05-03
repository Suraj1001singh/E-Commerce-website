import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  // media: {
  //   height: 260,
  // },

  buttons: {
    display: "flex",
    alignItems: "center",
    outline: "none",
  },
 
  media: {
    height: "0",
    paddingTop: "56.25%", //16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
