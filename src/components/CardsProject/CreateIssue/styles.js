import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  CreateIssueWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "800px",
    padding: "20px",
  },
  cardBlack: {
    width: "800px",
    padding: "20px",
    color: "#fcf9f9",
    backgroundColor: "#222b36",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  createIssueButton: {
    zIndex: 14,
    marginRight: "10px",
  },
  dateField: {
    marginTop: "10px",
  },
  timeField: {
    marginTop: "10px",
  },
  markDownTextEditorWrapper: {
    marginTop: "20px",
  },
  markDownTextEditorLabel: {
    marginBottom: "6px",
  },
  inputBlackTheme: {
    color: "white",
  },
});
