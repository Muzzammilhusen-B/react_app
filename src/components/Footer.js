import React from "react";
import "antd/dist/antd.css";
import { Layout, Space } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";

const { Footer } = Layout;
const Footerbar = () => {
  return (
    <Layout>
      <Footer
        style={{
          textAlign: "center",
          // alignContent: "end"
          clear: "both",
          // marginTop: "20px",
          position: "relative",
          // bottom: "0",
          width: "100%",
          height: "20px",
          justifyContent: "center",
        }}
      >
        <Space>
          {/* <HeartFilled /> */}
          <ShoppingTwoTone style={{ fontSize: "20px" }} />
          Shop Cart App ©2021.
        </Space>
      </Footer>
    </Layout>
  );
};

export default Footerbar;
