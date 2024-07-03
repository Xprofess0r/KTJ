import React from "react";
import styles from "./LandingPage.module.css";
import ktjvideo from "../../images/LandingpageV.mp4";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  const videoEnd = () => {
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <div>
        <video className={styles.videoDiv} onEnded={videoEnd}
         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
         autoPlay>
          <source src={ktjvideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Landing;
