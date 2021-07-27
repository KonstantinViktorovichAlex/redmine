import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
  },
  tableHeader: {
    backgroundColor: "rgb(63, 81, 181)",
  },
  blackTableHeader: {
    backgroundColor: "#222b36",
  },
  blackTableBody: {
    backgroundColor: "#222b36a8",
  },
  tableRow: {
    color: "white",
  },
});
