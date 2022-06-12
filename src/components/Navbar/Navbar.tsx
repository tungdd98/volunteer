import React, { FC, useState } from "react";

import { LogoutRounded } from "@mui/icons-material";
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
  Typography,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import CustomLink from "components/CustomLink/CustomLink";
import { ArticlePathsEnum } from "features/article/article";
import { AuthPathsEnum, logout } from "features/auth/auth";
import { BannerPathsEnum } from "features/banner/banner";
import { CategoryPathsEnum } from "features/category/category";
import { ROOT_ROUTE } from "routes/routes.config";

const Navbar: FC = () => {
  const auth = getAuth();
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(state => state.auth);
  const { categories } = useAppSelector(state => state.category);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElBtn, setAnchorElBtn] = useState<null | HTMLElement>(null);

  const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElBtn(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElBtn(null);
  };

  const handleLogout = () => {
    signOut(auth).finally(() => {
      history.push(ROOT_ROUTE);
      dispatch(logout());
    });
  };

  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <CustomLink
            to={ROOT_ROUTE}
            variant="h6"
            fontWeight={600}
            sx={{ flexGrow: 1, textDecoration: "none" }}
            isActive
          >
            LOGO
          </CustomLink>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Stack direction="row" spacing={2}>
              <Button onClick={handleOpenNavMenu}>
                <Typography fontWeight={600}>Hoàn cảnh khó khăn</Typography>
              </Button>
              <Button>
                <Typography fontWeight={600}>Chuyến đi thiện nguyện</Typography>
              </Button>
            </Stack>

            {userInfo && (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                {userInfo?.displayName}
                <IconButton onClick={handleOpenAccountMenu}>
                  <Avatar
                    alt={userInfo?.displayName || "avatar"}
                    src={userInfo?.photoURL || ""}
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
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
        <MenuItem component={Link} to={CategoryPathsEnum.ADMIN_LIST}>
          Danh mục sự kiện
        </MenuItem>
        <MenuItem component={Link} to={BannerPathsEnum.ADMIN_LIST}>
          Banner
        </MenuItem>
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

      <Menu
        anchorEl={anchorElBtn}
        open={!!anchorElBtn}
        onClose={handleCloseNavMenu}
        onClick={handleCloseNavMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {categories?.map(item => (
          <MenuItem
            key={item.id}
            component={Link}
            to={ArticlePathsEnum.ARTICLE_LIST.replace(/:categoryId/, item.id)}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Navbar;
