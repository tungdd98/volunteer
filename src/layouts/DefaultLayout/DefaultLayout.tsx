import React, { FC } from "react";

import { Box } from "@mui/material";

import AppFooter from "components/AppFooter/AppFooter";
import Navbar from "components/Navbar/Navbar";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <AppFooter />
    </Box>
  );
};

export default DefaultLayout;
