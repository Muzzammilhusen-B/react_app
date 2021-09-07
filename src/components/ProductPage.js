import logo from "./logo.png";
import React from "react";
import {
  Layout,
  Menu,
  Tooltip,
  Image,
  Table,
  Button,
  Badge,
  Tag,
  message,
  Spin,
} from "antd";
import { ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import api from "./apis/api";
import { loadProductsfromLocal } from "../localstorage";
import Footerbar from "./Footer";
import { connect } from "react-redux";
import { addToCart, fetchData } from "./actions";

const { Header, Content } = Layout;

class ProductPage extends React.Component {
  state = { spin: false };
  componentDidMount() {
    // this.handleResponse();
    const data = loadProductsfromLocal();
    this.props.fetchData(data);
  }

  //log out=>
  handleLogout = async () => {
    this.setState({ spin: true });
    const AUTH_TOKEN = JSON.parse(localStorage.getItem("authToken"));
    console.log("authtoken", AUTH_TOKEN);
    const result = await api.delete("/api/users/sign_out", {
      headers: {
        AUTH_TOKEN: AUTH_TOKEN,
      },
    });
    console.log("logout result", result);
    if (result.data.status === 200) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      const success = () => {
        message.success(`${result.data.message}`);
      };
      success();
      const { history } = this.props;
      if (history) history.push("/loginpage");
    } else {
      this.setState({ spin: false });
      const error = () => {
        message.error(`${result.data.message}`);
      };
      error();
    }
  };
  //add to cart
  handleAddtocart = (id, event) => {
    event.preventDefault();
    console.log("items id clicked", id);
    this.props.addToCart(id);
  };
  //redirect to cart
  redirectToCart = () => {
    const { history } = this.props;
    if (history) history.push("/dashboardpage/cart");
  };
  render() {
    const { items } = loadProductsfromLocal();
    const count = this.props.addedItems.length;
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("user", user.first_name);
    // console.log("products", items);
    // const stateItems = this.props.state.items;

    const columns = [
      {
        title: "Name",
        key: "Name",
        dataIndex: "Name",
      },
      {
        title: "Location",
        key: "Location",
        dataIndex: "Location",
      },
      {
        title: "Price in ($)",
        key: "price",
        dataIndex: "price",
      },
      {
        title: "Quantity",
        key: "qty",
        dataIndex: "qty",
      },
      {
        title: "Action",
        key: "addtocart",
        dataIndex: "",
        render: (items) => (
          <Button
            type="link"
            disabled={items.qty === 0 ? true : ""}
            onClick={(event) => this.handleAddtocart(items.id, event)}
          >
            Add to cart
          </Button>
        ),
      },
      {
        title: "Availability",
        key: "availability",
        dataIndex: "",
        render: (items) => {
          if (items.qty > 0) {
            return <Tag color="green">Available</Tag>;
          } else {
            return <Tag color="red">Sold Out</Tag>;
          }
        },
      },
    ];
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
              <Link to="/dashboardpage">
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
          <div style={{ float: "right" }}>
            <Badge
              status="success"
              text={<Link to="/dashboardpage">{user.first_name}</Link>}
            />
          </div>
          <Menu style={{ float: "right" }} mode="horizontal" theme="light">
            <Menu.Item
              key="0"
              onClick={this.redirectToCart}
              icon={<ShoppingCartOutlined />}
              style={{ float: "right" }}
            >
              <Badge count={count} className="head-example">
                Cart{" "}
              </Badge>
            </Menu.Item>

            <Menu.Item
              key="1"
              onClick={this.handleLogout}
              icon={<LogoutOutlined />}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Spin spinning={this.state.spin} tip="Logging out...">
          <Content style={{ marginTop: "50px", height: "700px" }}>
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Table
                key={items.id}
                columns={columns}
                dataSource={items}
                style={{ overflowX: "auto" }}
              />
            </div>
          </Content>
          <Footerbar />
        </Spin>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state in home page", state);
  return {
    state: state,
    addedItems: state.addedItems,
    total: state.total,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    fetchData: (data) => {
      dispatch(fetchData(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
