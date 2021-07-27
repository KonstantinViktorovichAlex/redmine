export const checkError = (e, errorState, setErrorState) => {
  if (e.response) {
    setErrorState({
      ...errorState,
      error: true,
      errorStatus: e.response.status,
    });
  } else {
    setErrorState({
      ...errorState,
      error: true,
      errorStatus: 500,
    });
  }
  setTimeout(() => {
    setErrorState({
      ...errorState,
      error: false,
      errorStatus: "",
    });
  }, 5000);
};
