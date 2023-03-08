import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import NavigationBar from "../../common/navigation-bar/navigation-bar";
import SignIn from "../signin/signin";
import SignUp from "../signup/signup";
import Homepage from "../homepage/homepage"
import ProductDetails from "../product-details/product-details"
import "../../common/common.css";

const Eshop = React.memo(() => {
  const { signin, signup, userInfo } = useSelector(state => state);
  const dispatch = useDispatch();

  const onSignInSubmit = (event, history) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const signData = Object.fromEntries(formData);
    const email = signData.email;
    const password = signData.password;

    if (userInfo[email] && userInfo[email].password === password) {
      if (email === "admin@gmail.com") {
        dispatch({ type: "SET_USER_ROLE", payload: { isError: false, isAdmin: true } });
      } else {
        dispatch({ type: "SET_USER_ROLE", payload: { isError: false, isNormalUser: true } })
      }
      history.push("/home");
    } else {
      dispatch({ type: "SET_USER_ROLE", payload: { isError: true } })
    }
  };

  const onSignUpSubmit = (event, history) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const signData = Object.fromEntries(formData);
    const email = signData.email;
    const password = signData.password;
    const confirmPassword = signData.confirmPassword;
    if (userInfo[email]) {
      dispatch({ type: "POST_SIGN_UP_INFO", payload: { isUserExits: true, isPasswordMatch: false } });
    }
    else if (password !== confirmPassword) {

      dispatch({ type: "POST_SIGN_UP_INFO", payload: { isUserExits: false, isPasswordMatch: true } });
    }
    else {
      dispatch({ type: "POST_USER_INFO", payload: { [email]: signData } });
      history.push("/login");
      dispatch({ type: "POST_SIGN_UP_INFO", payload: { isUserExits: false, isPasswordMatch: false } });
    }
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Router>
        <NavigationBar />
        <Route path="/login" render={({ history }) =>
          <SignIn
            signinInfo={signin} handleSubmit={(event) => onSignInSubmit(event, history)} />}
        />
        <Route path="/signup" render={({ history }) =>
          <SignUp
            signupInfo={signup} handleSubmit={(event) => onSignUpSubmit(event, history)} />}
        />
        <Route path="/home" render={({ history }) =>
          <Homepage />}
        />
        <Route path="/products/:id" render={({ history }, props) =>
          <ProductDetails {...props}/>}
        />
      </Router>
    </div >

  );
})

export default Eshop;
