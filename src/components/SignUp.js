import React from "react";
import logo from "./logo.png";
import {
  Layout,
  Tooltip,
  Image,
  Menu,
  Result,
  Button,
  Form,
  Input,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { SmileOutlined, LoginOutlined } from "@ant-design/icons";
import "./signup.css";
import "antd/dist/antd.css";
import Footerbar from "./Footer";

const { Header, Content, Sider } = Layout;

class SignUp extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    errors: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
    },
  };

  //onchange

  handleOnChange = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "firstname":
        errors.firstname = !value.match(
          /^(?=[a-zA-Z]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        )
          ? "*Firstname must be at least 5 characters long and without special character!"
          : "";
        break;
      case "lastname":
        errors.lastname = !value.match(
          /^(?=[a-zA-Z]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        )
          ? "*Lastname must be at least 3 characters long and without special character!"
          : "";
        break;
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
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$"
        )
          ? "*Password should contain one smallcase, uppercase, symbol & number each and between 6-10 length"
          : "";
        break;
      case "confirmpassword":
        let pass1 = this.state.password;
        errors.confirmpassword =
          value !== pass1 ? "*Password do not match." : "";
        break;

      case "phone":
        errors.phone = !value.match("^[0-9]{10}$")
          ? "Please Enter valid 10 digit mobile number!"
          : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  //handle validation
  handleValidation = () => {
    let formIsValid = true;
    const { firstname, lastname, email, password, confirmpassword, phone } =
      this.state.errors;

    let formerror =
      firstname === "" &&
      lastname === "" &&
      password === "" &&
      confirmpassword === "" &&
      email === "" &&
      phone === "";

    if (formerror) {
      const { firstname, lastname, email, password, confirmpassword, phone } =
        this.state;
      if (
        firstname === "" ||
        lastname === "" ||
        password === "" ||
        confirmpassword === "" ||
        email === "" ||
        phone === ""
      ) {
        return false;
      }
      return formIsValid;
    }
    return false;
  };

  //if valid form redirect to product home(dashboard) page
  redirectProductPage = () => {
    const { history } = this.props;
    if (history) history.push("/dashboardpage");
  };

  //handle signup
  handleSignup = (e) => {
    e.preventDefault();

    // console.log("state", this.state);
    if (this.handleValidation(this.state.errors)) {
      const success = () => {
        message.success("Sign up successfully");
      };
      success();
      this.redirectProductPage();
      localStorage.setItem("signup", JSON.stringify(this.state));
    } else if (!this.handleValidation(this.state.errors)) {
      const error = () => {
        message.error("Please input valid credentials!");
      };
      error();
    }
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      errors,
      phone,
    } = this.state;
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
            <Menu.Item key="1">
              <Link to="/loginpage"> Login</Link>
            </Menu.Item>
            {/* <Menu.Item key="2">
              <Link to="/signuppage">New User? SignUp</Link>
            </Menu.Item> */}
          </Menu>
        </Header>
        <Layout className="layout">
          <Sider
            // width={400}
            style={{ marginTop: "60px", background: "rgb(103, 6, 156)" }}
            breakpoint="lg"
            collapsedw="0"
          >
            <Result
              icon={<SmileOutlined />}
              title="Great, You are few clicks away from Sign up! Fill the details."
            />
          </Sider>
          <Content
          // style={{ marginTop: "60px" }}
          >
            <div className="form-layout">
              <h1 className="heading">Sign up for Shopping App</h1>
              <Form layout="vertical" style={{ width: "400px" }}>
                <Form.Item>
                  <Input
                    placeholder="First Name"
                    name="firstname"
                    value={firstname}
                    onChange={this.handleOnChange}
                    required
                  />
                  <h5 className="errors">{errors["firstname"]}</h5>
                </Form.Item>

                <Form.Item>
                  <Input
                    placeholder="Last Name"
                    name="lastname"
                    value={lastname}
                    onChange={this.handleOnChange}
                    required
                  />
                  <h5 className="errors">{errors["lastname"]}</h5>
                </Form.Item>

                <Form.Item>
                  <Input
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleOnChange}
                    required
                  />
                  <h5 className="errors">{errors["email"]}</h5>
                </Form.Item>

                <Form.Item>
                  <Input.Password
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleOnChange}
                    required
                  />
                  <h5 className="errors">{errors["password"]}</h5>
                </Form.Item>

                <Form.Item>
                  <Input.Password
                    name="confirmpassword"
                    placeholder="ConfirmPassword"
                    value={confirmpassword}
                    onChange={this.handleOnChange}
                    required
                  />
                  <h5 className="errors">{errors["confirmpassword"]}</h5>
                </Form.Item>

                <Form.Item>
                  <Input
                    prefix={"+91"}
                    required
                    name="phone"
                    maxLength="10"
                    placeholder="Phone"
                    value={phone}
                    onChange={this.handleOnChange}
                  />
                  <h5 className="errors">{errors["phone"]}</h5>
                </Form.Item>

                <h5>
                  *By signing up, you agree to Shop App{" "}
                  <Link to="/signuppage">
                    <u>Term of Service.</u>
                  </Link>
                </h5>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.handleSignup}
                  icon={<LoginOutlined />}
                >
                  Sign up
                </Button>

                <h4>
                  Already have an account?{" "}
                  <Link to="/loginpage">
                    <u>Login Here!</u>
                  </Link>
                </h4>
              </Form>
            </div>
          </Content>
        </Layout>
        <Footerbar />
      </Layout>
    );
  }
}
export default SignUp;
