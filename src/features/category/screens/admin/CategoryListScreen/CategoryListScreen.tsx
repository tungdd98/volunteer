import React, { FC, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import {
  CategoryDef,
  CategoryPathsEnum,
  getCategoryList,
} from "features/category/category";

import CategoryItem from "../../../components/admin/CategoryItem/CategoryItem";

const CategoryListScreen: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<null | CategoryDef>(
    null
  );

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    item: CategoryDef
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const redirectEditScreen = () => {
    if (selectedCategory) {
      history.push(
        CategoryPathsEnum.ADMIN_EDIT.replace(/:categoryId/, selectedCategory.id)
      );
    }
  };

  useEffect(() => {
    dispatch(getCategoryList()).finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 3 }} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" fontSize={20}>
          Danh mục sự kiện
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={CategoryPathsEnum.ADMIN_CREATE}
        >
          Thêm mới
        </Button>
      </Box>

      {categories && categories.length > 0 ? (
        categories.map(item => (
          <CategoryItem
            key={item.id}
            category={item}
            handleOpenMenu={handleOpenMenu}
          />
        ))
      ) : (
        <Typography>Không có dữ liệu</Typography>
      )}

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          style: {
            minWidth: 160,
          },
        }}
      >
        <MenuItem onClick={redirectEditScreen}>Cập nhật</MenuItem>
      </Menu>
    </Container>
  );
};

export default CategoryListScreen;
