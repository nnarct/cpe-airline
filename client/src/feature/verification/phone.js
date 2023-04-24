export const isPhoneNumber = (str) => {
  const re = /^\(?(\d{10})$/;
  console.log(re.test(str));
  return re.test(str);
};

