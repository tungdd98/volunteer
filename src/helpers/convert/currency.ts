export const toCurrency = (number: number, disableStyle?: boolean) => {
  return new Intl.NumberFormat("vi-VN", {
    style: disableStyle ? undefined : "currency",
    currency: "VND",
  }).format(number);
};
