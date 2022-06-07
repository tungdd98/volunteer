import React, { FC, useEffect, useState } from "react";

import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Loader from "components/Loader/Loader";
import { getArticleDetail } from "features/article/article";

const DonateProgressScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { articleDetail } = useAppSelector(state => state.article);

  const { articleId } = useParams<{ articleId: string }>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleDetail(articleId)).finally(() => setIsLoading(false));
    }
  }, [articleId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!articleDetail) {
    return <div>Error...</div>;
  }

  return (
    <Container sx={{ pt: 3 }} maxWidth="sm">
      <Box
        sx={{
          borderRadius: "50% 50% 47% 53% / 30% 30% 70% 70%",
          height: "60vh",
          bgcolor: "primary.dark",
          position: "fixed",
          width: "100%",
          top: "-10%",
          maxWidth: 500,
          margin: "auto",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </Container>
  );
};

export default DonateProgressScreen;
