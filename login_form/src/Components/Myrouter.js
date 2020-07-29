import React from "react";
import { Route, Redirect } from "react-router-dom";

const Myrouter = ({ component: Component, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("jwt") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default Myrouter;
