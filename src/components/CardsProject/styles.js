import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    width: 320,
    marginRight: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  rootBlack: {
    color: "#fcf9f9",
    backgroundColor: "#222b36",
    width: 320,
    marginRight: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "20px",
  },
  description: {
    marginBottom: "20px",
  },
  pos: {
    marginBottom: "20px",
    fontSize: 13,
  },
  posBlack: {
    color: "#797f8d",
    marginBottom: "20px",
    fontSize: 13,
  },
  dateWrapper: {
    display: "flex",
  },
  blackButton: {
    backgroundColor: "#688eff",
  },
});
