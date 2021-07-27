export const getInitialLoginState = () => {
  return (
    JSON.parse(localStorage.getItem("login")) || { Username: "", Password: "" }
  );
};
export const getInitialCheckboxState = () => {
  return JSON.parse(localStorage.getItem("checkbox")) || false;
};

export const isError = () => {
  return {
    error: false,
    errorStatus: "",
  };
};
