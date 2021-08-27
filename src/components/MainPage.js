import React from "react";
import { Layout, Card, Carousel, Tooltip, Image, Menu } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import logo from "./logo.png";
import product1 from "./product1.jpg";
import product2 from "./product2.jpg";
import product3 from "./product3.jpg";
import Footerbar from "./Footer";

const { Header, Content } = Layout;
const MainPage = () => {
  return (
    <Layout style={{ height: "800px" }}>
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
            <Link to="/loginpage"> SignIn</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/signuppage">New User? SignUp</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ marginTop: "50px" }}>
        {/* <div> */}
        <Carousel autoplay>
          <Card
            style={{ height: "700px" }}
            cover={
              <Image
                src={product1}
                style={{ height: "700px", width: "100%" }}
              />
            }
          />
          <Card
            cover={
              <Image
                src={product2}
                style={{ height: "700px", width: "100%" }}
              />
            }
          />
          <Card
            cover={
              <Image
                src={product3}
                style={{ height: "700px", width: "100%" }}
              />
            }
          />
        </Carousel>
        {/* </div> */}
      </Content>
      <Footerbar />
    </Layout>
  );
};

export default MainPage;
