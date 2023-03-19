// Importing necessary modules and components
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavigationBar from "../../common/navigation-bar/navigation-bar";
import SignIn from "../signin/signin";
import SignUp from "../signup/signup";
import Homepage from "../homepage/homepage"
import ProductDetails from "../product-details/product-details"
import "../../common/common.css";
import Order from "../orders/order";
import AddProduct from "../add-product/add-product";
import ModifyProduct from "../modify-product/modify-product";

// Functional component Eshop
const Eshop = React.memo(() => {
  // Getting the state variables signin, signup, and userInfo from the redux store
  const { signin, signup, userInfo } = useSelector(state => state);
  // Creating a dispatch function
  const dispatch = useDispatch();
// Function to handle submit event of sign-in form
  const onSignInSubmit = (event, history) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const signData = Object.fromEntries(formData);
    const email = signData.email;
    const password = signData.password;

    // Checking if the user exists and the password is correct
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

  // Function to handle submit event of sign-up form
  const onSignUpSubmit = (event, history) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const signData = Object.fromEntries(formData);
    const email = signData.email;
    const password = signData.password;
    const confirmPassword = signData.confirmPassword;
    // Checking if the user already exists
    if (userInfo[email]) {
      dispatch({ type: "POST_SIGN_UP_INFO", payload: { isUserExits: true, isPasswordMatch: false } });
    }
    // Checking if the password and confirm password fields match
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
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
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
        <Route path="/products/:id" render={(props) =>
          <ProductDetails {...props} />}
        />
        <Route path="/orders" render={(props) =>
          <Order {...props}/>}
        />
        <Route path="/addproduct" render={(props) =>
          <AddProduct {...props}/>}
        />
        <Route path="/modifyproducts/:id" render={(props) =>
          <ModifyProduct {...props}/>}
        />
      </Router>
    </div >

  );
})

export default Eshop;
