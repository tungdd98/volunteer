export const convertSrcToFile = async (src: string): Promise<File | null> => {
  try {
    const fileName = "image.jpg";
    const response = await fetch(src, { cache: "no-cache" });
    const blob = await response.blob();
    const type = response.headers.get("content-type") || undefined;

    return new File([blob], fileName, { type });
  } catch (error) {
    return null;
  }
};
