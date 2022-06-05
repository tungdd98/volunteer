import React, { FC, useState } from "react";

import { MenuRounded, LogoutRounded } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import CustomLink from "components/CustomLink/CustomLink";
import { AuthPathsEnum, setUserInfo } from "features/auth/auth";
import { AUTH_ROUTE, ROOT_ROUTE } from "routes/routes.config";

const Navbar: FC = () => {
  const auth = getAuth();
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(auth).finally(() => {
      history.push(AUTH_ROUTE);
      dispatch(setUserInfo(null));
    });
  };

  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuRounded />
          </IconButton>
          <CustomLink
            to={ROOT_ROUTE}
            variant="h6"
            fontWeight={600}
            sx={{ flexGrow: 1, textDecoration: "none" }}
            isActive
          >
            LOGO
          </CustomLink>

          {userInfo ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {userInfo?.displayName}
              <IconButton onClick={handleOpenAccountMenu}>
                <Avatar
                  alt={userInfo?.displayName || "avatar"}
                  src={userInfo?.photoURL || ""}
                  sx={{ width: 30, height: 30 }}
                />
              </IconButton>
            </Box>
          ) : (
            <Stack spacing={1} direction="row">
              <Button
                color="primary"
                variant="contained"
                size="small"
                component={Link}
                to={AuthPathsEnum.LOGIN}
              >
                Đăng nhập
              </Button>
              <Button
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                to={AuthPathsEnum.REGISTER}
              >
                Đăng ký
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseAccountMenu}
        onClick={handleCloseAccountMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to={AuthPathsEnum.MY_PROFILE}>
          Thông tin cá nhân
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
