import React, {
  FC,
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

import { Box, BoxProps, styled } from "@mui/material";

import NoImage from "assets/images/no-image.png";

const BasicImage = styled("img")(() => ({
  maxWidth: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
}));

interface PreviewImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  file?: File | null;
  resizedDimension?: {
    width: number;
    height: number;
  };
  borderRadius?: string | number;
  aspectRatio?: number;
  boxProps?: BoxProps;
  isCenter?: boolean;
}

const PreviewImage: FC<PreviewImageProps> = ({
  src,
  alt = "alt",
  file,
  resizedDimension,
  borderRadius = 1,
  aspectRatio,
  width,
  boxProps,
  isCenter,
  ...props
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>();

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleRefImage = useCallback(() => {
    if (!imageRef.current) return;

    if (aspectRatio && imageRef.current.width) {
      imageRef.current.style.setProperty(
        "height",
        `${imageRef.current.width / aspectRatio}px`
      );
    }
  }, [aspectRatio]);

  const handleImageOnLoad = useCallback(() => {
    handleRefImage();
  }, [handleRefImage]);

  useEffect(() => {
    const reader = new FileReader();
    if (file && file instanceof File) {
      reader.onloadend = readerEvent => {
        if (!resizedDimension) {
          setPreviewUrl(readerEvent.target?.result?.toString());
        } else {
          const canvas = document.createElement("canvas");
          canvas.width = resizedDimension.width;
          canvas.height = resizedDimension.height;
          const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
          const resizedImage = new Image();

          resizedImage.onload = () => {
            ctx.drawImage(
              resizedImage,
              0,
              0,
              resizedDimension.width,
              resizedDimension.height
            );
            const dataUrl = canvas.toDataURL(file.type);

            setPreviewUrl(dataUrl);
          };
          resizedImage.src = readerEvent.target?.result?.toString() || "";
        }
      };
      reader.readAsDataURL(file);
    } else if (typeof file === "string") {
      if (previewUrl === file) {
        return;
      }

      setPreviewUrl(file);
    } else {
      if (previewUrl === null) return;

      setPreviewUrl(null);
    }
  }, [file, previewUrl, resizedDimension]);

  const imageSrc = useMemo(() => {
    return src;
  }, [src]);

  return (
    <Box sx={{ width: "100%" }} {...boxProps}>
      <BasicImage
        src={previewUrl || imageSrc || NoImage}
        alt={alt}
        {...props}
        sx={{
          borderRadius,
          width: width || "100%",
          mx: isCenter ? "auto" : "",
        }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = NoImage;
        }}
        ref={image => {
          if (!image) {
            return;
          }

          imageRef.current = image;

          image.onload = handleImageOnLoad;

          if (image.complete) {
            handleImageOnLoad();
          }
        }}
        style={{
          height: props.height,
        }}
      />
    </Box>
  );
};

export default memo(PreviewImage);
