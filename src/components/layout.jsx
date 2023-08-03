import React from "react";
import { Container } from "@mui/material";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <Container style={{ maxWidth: "100%" }}>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
