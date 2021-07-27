import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  groupeWrapper: {
    display: "flex",
  },
  groupeItemsWrapper: {
    marginRight: "10px",
  },
  paperGroupItem: {
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "15px",
    paddingTop: "15px",
  },
  blackPaperGroupItem: {
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "15px",
    paddingTop: "15px",
    color: "#fcf9f9",
    backgroundColor: "#222b36",
  },
  blackButton: {
    backgroundColor: "#688eff",
  },
  headerPaper: {
    marginBottom: "15px",
  },
  loaderWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
