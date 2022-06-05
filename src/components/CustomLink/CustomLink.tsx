import React, { FC, memo } from "react";

import { Typography, TypographyProps, styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

interface CustomLinkProps extends Pick<LinkProps, "to">, TypographyProps {
  children?: React.ReactNode;
  disabledHover?: boolean;
  isActive?: boolean;
}

const CustomLinkStyled = styled(Link, {
  shouldForwardProp: prop => prop !== "disabledHover",
})<{ disabledHover?: boolean }>(({ theme, disabledHover }) => ({
  textDecoration: "none",
  color: "inherit",
  transition: theme.transitions.create("color", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!disabledHover && {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  }),
}));

const CustomLink: FC<CustomLinkProps> = ({
  to,
  children,
  disabledHover,
  isActive,
  ...props
}) => {
  return (
    <Typography
      color={isActive ? "primary" : "secondary.contrastText"}
      {...props}
    >
      <CustomLinkStyled disabledHover={disabledHover} to={to}>
        {children}
      </CustomLinkStyled>
    </Typography>
  );
};

export default memo(CustomLink);
