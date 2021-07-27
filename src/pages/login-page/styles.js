import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles({
  papperStyle: {
    padding: 30,
  },
  textContainer: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerText: {
    textAlign: "center",
    marginBottom: "20px",
    color: red[800],
  },
  textField: {
    width: "50ch",
    marginBottom: "10px",
  },
  formControlStyle: {
    float: "right",
  },
});
export default useStyles;
