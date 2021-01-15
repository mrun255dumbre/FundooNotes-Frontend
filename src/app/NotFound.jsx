import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  head: {
    fontSize: "150px",
    fontWeight: "bold",
    color: "#DCDCDC"
  },
  subtitle: {
    display: "flex",
    fontWeight:'bold',
    fontSize:"20px"
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.head}>404</div>
      <div className={classes.subtitle}>Page not found !</div>
    </div>
  );
};
export { NotFound };
