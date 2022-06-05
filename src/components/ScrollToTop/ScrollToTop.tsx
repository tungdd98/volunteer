import React, { FC, memo } from "react";

import { KeyboardArrowUpRounded } from "@mui/icons-material";
import { Box, Fab, Zoom } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface ScrollToTopProps {
  window?: () => Window;
}

const ScrollToTop: FC<ScrollToTopProps> = ({ window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpRounded />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default memo(ScrollToTop);
