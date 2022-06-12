export const truncateString = (str: string, num = 75) => {
  if (str.length <= num) {
    return str;
  }

  return `${str.slice(0, num)}...`;
};
