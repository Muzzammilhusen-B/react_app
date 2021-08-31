import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import LogIn from "./LognIn";
import MainPage from "./MainPage";
import ProductPage from "./ProductPage";
import SignUp from "./SignUp";
import Cart from "./Cart";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/loginpage" exact component={LogIn} />
          <Route path="/signuppage" exact component={SignUp} />
          <Route path="/dashboardpage" exact component={ProductPage} />
          <Route path="/dashboardpage/cart" exact component={Cart} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
