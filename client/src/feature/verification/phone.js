export const isPhoneNumber = (str) => {
  const re = /^\(?(\d{10})$/;
  return re.test(str);
};

