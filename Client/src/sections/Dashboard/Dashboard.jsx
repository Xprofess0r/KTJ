import { useNavigate } from "react-router-dom";
import classes from "./Dashboard.module.css";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  // console.log(aut)
  const id = auth.user?.ktjID;
  const navigate = useNavigate();
  const EXPLORE = () => {
    navigate("/");
  };
  const EDIT = () => {
    navigate("/profile");
  };
  return (
    <div className={classes.bg}>
      <div className={classes.rectangle}>
        <div className={classes.starting_text}>
          <div className={classes.text}>
            YOU HAVE BEEN REGISTERED FOR
          </div>

          <div className={classes.logo}>
            KSHITIJ 2024
          </div>
        </div>
        <div className={classes.ktjID}>
          Your KTJ ID IS {id}
          <br></br>
          PLEASE NOTE IT FOR FUTURE REFERENCE.
        </div>
        <div className={classes.button}>
          <button className={classes.dash_button} onClick={EXPLORE}>
            EXPLORE KTJ
          </button>
          <button className={classes.dash_button} onClick={EDIT}>
            EDIT PROFILE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
