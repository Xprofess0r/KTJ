import Classes from "./button.module.css";
import ReactGa from "react-ga";
import { useNavigate } from "react-router-dom";

const BackBtn = (props) => {
  const navigate = useNavigate();

  const goBack = () => {
    ReactGa.event({
      category: "Click",
      action: "Clicked on Back in ComingSoonpage",
    });
    navigate(-1); // This is equivalent to going back in the history
  };

  const className =
    Classes.back_button +
    " " +
    {
      "left-bottom": Classes.left_bottom,
      "right-bottom": Classes.right_bottom,
      "left-top": Classes.left_top,
      "right-top": Classes.right_top,
    }[props.position];

  return (
    <button onClick={goBack} className={className}>
      Back
    </button>
  );
};

export default BackBtn;
