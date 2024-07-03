import { useNavigate } from "react-router-dom";
import classes from "./Backbtn.module.css"
function Back() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className={classes.backbtn}
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >Back
      </button>
    </>
  );
}
export default Back;
