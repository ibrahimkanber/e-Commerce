import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const SellerRoute = ({ component: Component, ...res }) => {
  const authSignIn = useSelector((state) => state.authSignIn);

  const { userInfo } = authSignIn;

  return (
    <Route
      {...res}
      render={(props) =>
        userInfo && userInfo.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
};

export { SellerRoute };