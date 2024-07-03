import { useEffect, useState } from "react"
import styles from "./Homepage.module.css";

export default function VR_Button({ entered, isVR, setIsVR, setNavIndex }) {

  const enterSFX = new Audio("/sfx/enter.aac")
  enterSFX.volume = 0.1

  const toggleVR = () => {
    enterSFX.currentTime = 0.3;
    enterSFX.play();
    setNavIndex(-1)
    setIsVR(old => {
      console.log(old)
      return !old
    })
  }

  return (
    <>
      <div className={styles.AR_btn} onClick={toggleVR}>
        <span className="material-symbols-outlined">{isVR ? "view_in_ar_off" : "view_in_ar"}</span>
        <span><b>{isVR ? "EXIT 3D" : "VIEW IN 3D"}</b></span>
      </div>
    </>
  )
}
