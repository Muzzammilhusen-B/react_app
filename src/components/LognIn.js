import React from "react";
// import "antd/dist/antd.css";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  message,
  Menu,
  Tooltip,
  Image,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import logo from "./logo.png";
import "./login.css";
import { Link } from "react-router-dom";
import Footerbar from "./Footer";

const { Header, Content } = Layout;

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
    errors: {
      email: "",
      password: "",
    },
  };

  componentDidMount() {
    const { email, password, remember } = this.state;
    this.setState({
      email: email,
      password: password,
      remember: remember,
    });
  }

  //on change event
  handleOnChange = (event) => {
    // console.log("clicked", event.target);
    const { name, value } = event.target;
    const checkbox = event.target.checked;
    // console.log("checkbox", checkbox);
    const isChecked = checkbox ? true : false;

    //switch statement for validation
    let { errors } = this.state;
    switch (name) {
      case "email":
        let lastAtPos = value.lastIndexOf("@");
        let lastDotPos = value.lastIndexOf(".");
        errors.email = !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          value.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          value.length - lastDotPos > 2
        )
          ? "*Email is not valid"
          : "";
        break;
      case "password":
        errors.password = !value.match(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,1000}$"
        )
          ? "*Password should contain one smallcase, uppercase, symbol & number each and minimum 6 in length"
          : "";
        break;

      default:
        break;
    }
    this.setState({ errors, [name]: value, remember: isChecked });
  };
  //handle validation
  handleValidation = () => {
    let formIsValid = true;
    if (this.state.errors.email === "" && this.state.errors.password === "") {
      const { email, password } = this.state;
      if (email === "" || password === "") {
        return false;
      }
      return formIsValid;
    }
    return false;
  };
  //handle login
  handleLogin = (e) => {
    e.preventDefault();
    const { remember } = this.state;
    // console.log("state", this.state);
    if (remember && this.handleValidation(this.state.errors)) {
      const success = () => {
        message.success("You are Logged In");
      };
      success();
      this.redirectLoginHome();
      localStorage.setItem("logindata", JSON.stringify(this.state));
    } else if (this.handleValidation(this.state.errors)) {
      const success = () => {
        message.success("You are Logged In");
      };
      success();
      this.redirectLoginHome();
    } else if (!this.handleValidation(this.state.errors)) {
      const error = () => {
        message.error("Please input valid credentials!");
      };
      error();
    }
  };
  //redirect loginhome page(product list component dashboard)
  redirectLoginHome = () => {
    const { history } = this.props;
    if (history) history.push("/dashboardpage");
  };

  render() {
    const { username, password, errors } = this.state;
    return (
      <Layout>
        <Header
          style={{
            background: "white",
            zIndex: 1,
            width: "100%",
            position: "fixed",
          }}
        >
          <div style={{ float: "left" }}>
            <Tooltip title="Home" placement="bottom">
              <Link to="/">
                <Image
                  src={logo}
                  width={"150px"}
                  style={{
                    padding: "10px",
                    // filter: "drop-shadow(0 0 0.75rem crimson)",
                  }}
                  preview={false}
                />
              </Link>
            </Tooltip>
          </div>
          <Menu style={{ float: "right" }} mode="horizontal" theme="light">
            {/* <Menu.Item key="1">
              <Link to="/loginpage"> SignIn</Link>
            </Menu.Item> */}
            <Menu.Item key="2">
              <Link to="/signuppage">New User? SignUp</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="layout">
          <div className="login-form">
            <h1 style={{ color: "purple" }}>LogIn</h1>
            <Form layout="vertical" style={{ width: "400px" }}>
              <Form.Item
                label="Email"
                // name="username"
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  value={username}
                  onChange={this.handleOnChange}
                  name="email"
                  placeholder="Email"
                />
                <h4 style={{ color: "red" }}>{errors["email"]}</h4>
              </Form.Item>
              <Form.Item
                label="Password"
                // name="password"
                rules={[{ required: true }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  onChange={this.handleOnChange}
                  value={password}
                  name="password"
                  placeholder="Password"
                />
                <h4 style={{ color: "red" }}>{errors["password"]}</h4>
              </Form.Item>

              <Checkbox onChange={this.handleOnChange} name="remember">
                Remember Me
              </Checkbox>

              <Form.Item name="login">
                <Button
                  type="primary"
                  style={{ width: "100%", marginTop: "5px" }}
                  icon={<LoginOutlined />}
                  onClick={this.handleLogin}
                >
                  Log In
                </Button>
              </Form.Item>
              <h3>
                New user?{" "}
                <Link to="/signuppage">
                  Register <UserAddOutlined />
                </Link>
              </h3>
            </Form>
          </div>
        </Content>
        <Footerbar />
      </Layout>
    );
  }
}

export default LogIn;
