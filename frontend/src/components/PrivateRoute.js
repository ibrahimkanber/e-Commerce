import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...res }) => {
  const authSignIn = useSelector((state) => state.authSignIn);

  const { userInfo } = authSignIn;

  return (
    <Route
      {...res}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
};

export { PrivateRoute };
