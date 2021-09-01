import logo from "./logo.png";
import React from "react";
import {
  Layout,
  Menu,
  Tooltip,
  Image,
  Badge,
  Card,
  Button,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Footerbar from "./Footer";
import { connect } from "react-redux";
import { addQty, remove, subQty } from "./actions";
import api from "./apis/api";

const { Header, Content } = Layout;
const { Meta } = Card;
class Cart extends React.Component {
  async componentDidMount() {
    const result = await api.get("/api/users/sign_in");
    console.log("user", result);
  }

  //redirect to dashboard
  redirectToDashboard = () => {
    const { history } = this.props;
    if (history) history.push("/dashboardpage");
  };
  //handle log out
  handleLogout = async () => {
    const result = await api.delete("/api/users/sign_out");
    console.log("logout result", result);
    const success = () => {
      message.success("Logout successfully..!");
    };
    success();
    const { history } = this.props;
    if (history) history.push("/loginpage");
  };
  //add quantity
  handleAddQty = (id) => {
    // console.log("add clicked");
    this.props.addQty(id);
  };
  //sub quantity
  handleSubQty = (id) => {
    // console.log("sub clicked");
    this.props.subQty(id);
  };
  //hanlde remove
  hanldeRemove = (id) => {
    this.props.remove(id);
  };
  render() {
    const count = this.props.addedItems.length;
    const addedItems = this.props.addedItems;
    const total = this.props.total;
    console.log("total", total);
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
          <Menu style={{ float: "right" }} mode="horizontal" theme="light">
            <Menu.Item
              key="1"
              onClick={this.redirectToDashboard}
              icon={<DashboardOutlined />}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<ShoppingCartOutlined />}
              style={{ float: "right" }}
            >
              <Badge count={count} className="head-example">
                Cart{" "}
              </Badge>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={this.handleLogout}
              icon={<LogoutOutlined />}
            >
              Log out
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ marginTop: "50px", height: "700px" }}>
          <div
            style={{ float: "right", padding: "20px", fontSize: "20px" }}
          >{`Total: ${total} $`}</div>
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "space-around",
            }}
          >
            {addedItems.map((item) => {
              console.log("card item", item);
              return (
                <Card
                  hoverable
                  style={{ width: 270, alignItems: "center" }}
                  title={item.Name}
                  key={item.id}
                >
                  <Meta
                    title={`Location: ${item.Location}`}
                    description={`Price: ${item.price} $`}
                  />
                  <Button
                    disabled={item.quantity === item.qty ? true : ""}
                    type="link"
                    onClick={() => this.handleAddQty(item.id)}
                    icon={<CaretUpOutlined style={{ fontSize: "20px" }} />}
                  />
                  {item.quantity}{" "}
                  <Button
                    type="link"
                    onClick={() => this.handleSubQty(item.id)}
                    icon={<CaretDownOutlined style={{ fontSize: "20px" }} />}
                  />
                  <div>
                    <Button
                      type="primary"
                      onClick={() => this.hanldeRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </Content>
        <Footerbar />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // state: state,
    total: state.total,
    addedItems: state.addedItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addQty: (id) => {
      dispatch(addQty(id));
    },
    subQty: (id) => {
      dispatch(subQty(id));
    },
    remove: (id) => {
      dispatch(remove(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
