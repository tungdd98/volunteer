import React, { FC } from "react";

import { Box, Typography } from "@mui/material";

const AppFooter: FC = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "primary.main", textAlign: "center", p: 2, mt: 3 }}
    >
      <Typography variant="body2" color="primary.contrastText">
        {"Copyright © "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
};

export default AppFooter;
