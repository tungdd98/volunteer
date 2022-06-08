import React, { FC } from "react";

import { Box } from "@mui/material";

import AppFooter from "components/AppFooter/AppFooter";

interface AdminNoSidebarProps {
  children: React.ReactNode;
}

const AdminNoSidebar: FC<AdminNoSidebarProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <AppFooter />
    </Box>
  );
};

export default AdminNoSidebar;
