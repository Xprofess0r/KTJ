import { useHistory } from "react-router-dom";
import classes from "./Backbtn.module.css"
function Back() {
  const history = useHistory();

  return (
    <>
      <button
        className={classes.backbtn}
        onClick={(e) => {
          e.preventDefault();
          history.push("/");
        }}
      >Back
      </button>
    </>
  );
}
export default Back;
