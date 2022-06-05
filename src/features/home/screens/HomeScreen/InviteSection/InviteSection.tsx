import React, { FC, memo } from "react";

import { Paper, Container, Typography, Button } from "@mui/material";

import PreviewImage from "components/PreviewImage/PreviewImage";
import { AspectRatioEnum } from "constants/common.constants";

const InviteSection: FC = () => {
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Paper elevation={10} sx={{ textAlign: "center", pb: 2 }}>
        <PreviewImage
          src="https://images.unsplash.com/photo-1500995617113-cf789362a3e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2592&q=80"
          aspectRatio={AspectRatioEnum.SIXTEEN_TO_NINE}
        />

        <Typography
          variant="subtitle2"
          textAlign="center"
          sx={{ py: 2, px: 4 }}
        >
          Mời bạn bè cùng tham gia và cùng nhau quyên góp nhé!
        </Typography>

        <Button variant="contained">Mời bạn bè</Button>
      </Paper>
    </Container>
  );
};

export default memo(InviteSection);
