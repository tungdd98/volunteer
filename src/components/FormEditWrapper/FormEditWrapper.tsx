import React, { FC, memo } from "react";

import { Container, Paper } from "@mui/material";

interface FormEditWrapperProps {
  children: React.ReactNode;
}

const FormEditWrapper: FC<FormEditWrapperProps> = ({ children }) => {
  return (
    <Container sx={{ my: 3 }} maxWidth="md">
      <Paper elevation={10} sx={{ p: 1.5 }}>
        {children}
      </Paper>
    </Container>
  );
};

export default memo(FormEditWrapper);
