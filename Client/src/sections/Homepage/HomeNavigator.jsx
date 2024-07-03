import React from "react";
import { useState } from "react";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

export default function HomeNavigator({
  keyframes,
  navIndex,
  showLink,
  changeSlide,
  entered,
}) {
  const goToFrame = (i) => {
    changeSlide(i - navIndex);
  };
  return (
    <>
      {navIndex >= 0 && (
        <div className={styles.homeNavigator}>

        {/* hide the overlay for the "Activities" page because buttons are added separately to it */}
        {navIndex != 1 && (
          <Link
            to={keyframes[navIndex].linkRoute}
            className={
              styles.redirectLink + " " + (showLink ? "" : styles.hide)
            }
          >
            <span>{keyframes[navIndex].linkText}</span>
            <span className="material-symbols-outlined">open_in_new</span>
          </Link>
        )}

        {navIndex === 1 && (
          <div className={styles.activitesLink + " " + (showLink ? "" : styles.hide)}>
            <Link
              to={'/workshop'}
              className={styles.redirectLinkActivities}
            >
              <span>WORKSHOPS</span>
              <span className="material-symbols-outlined">open_in_new</span>
            </Link>
              <Link
              to={"/gamefest"}
              className={
                styles.redirectLinkActivities}
            >
              <span>GAMEFEST</span>
              <span className="material-symbols-outlined">open_in_new</span>
            </Link>
          </div>
        )}


          <div className={styles.quickNavigation}>
            {/* <div className={styles.qNavHome + " " + (-1 == navIndex ? styles.active : "")} key={-1} onClick={() => { goToFrame(-1) }}>
                <span className="material-symbols-outlined">home</span>
                <span>HOME</span>
            </div> */}
            {keyframes.map((k, i) => {
              return (
                <div
                  className={
                    styles.qNavBtn + " " + (i == navIndex ? styles.active : "")
                  }
                  key={i}
                  onClick={() => {
                    goToFrame(i);
                  }}
                >
                  <span>{k.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {navIndex < 0 && <div className={styles.arrowNavigation__bottom}>
        {entered && (
          <span
            onClick={() => {
              changeSlide(1);
            }}
          >
            {" "}
            ^{" "}
          </span>
        )}
      </div>
}
      <div className={styles.arrowNavigation__right}>
        {navIndex >= 0 && entered && (
          <span
            onClick={() => {
              changeSlide(1);
            }}
          >
            {" > "}
          </span>
        )}
      </div>
      <div className={styles.arrowNavigation__left}>
        {navIndex >= 0 && entered && (
          <span
            onClick={() => {
              changeSlide(-1);
            }}
          >
            {" < "}
          </span>
        )}
      </div>
    </>
  );
}
