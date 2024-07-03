import React from "react";
import classes from "./Sidebar.module.css";
import ReactGa from "react-ga";

const Sidebar = (props) => (
  <>
    <div
      className={classes.navbar + " " + classes.tooltipcontainer}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div id="tthome" className={classes.tooltip}>
        Home
      </div>
      <div id="ttabout" className={classes.tooltip}>
        About
      </div>
      <div id="ttgrowth" className={classes.tooltip}>
        Growth
      </div>
      <div id="tttheme" className={classes.tooltip}>
        Theme
      </div>
      <div id="ttinitiat" className={classes.tooltip}>
        Initiatives
      </div>
      <div id="ttspons" className={classes.tooltip}>
        Sponsors
      </div>
      <div id="ttnewslet" className={classes.tooltip}>
        Newsletters
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 34.5 493.5"
      className={classes.navbar}
    >
      <defs>
        <radialGradient
          id="sidebar-radial-gradient"
          cx="17.25"
          cy="93.75"
          r={props.frameState === 1 ? 16.75 : 11}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#af6fdc" />
          <stop offset="0.76" stopColor="#b87fe0" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="sidebar-radial-gradient-2"
          cx="17.25"
          cy="17.25"
          r={props.frameState === 0 ? 16.75 : 11}
          xlinkHref="#sidebar-radial-gradient"
        />
        <radialGradient
          id="sidebar-radial-gradient-3"
          cx="17.25"
          cy="170.25"
          r={props.frameState === 2 ? 16.75 : 11}
          xlinkHref="#sidebar-radial-gradient"
        />
        <radialGradient
          id="sidebar-radial-gradient-4"
          cx="17.25"
          cy="246.75"
          r={props.frameState === 3 ? 16.75 : 11}
          xlinkHref="#sidebar-radial-gradient"
        />
        <radialGradient
          id="sidebar-radial-gradient-5"
          cx="17.25"
          cy="323.25"
          r={props.frameState === 4 ? 16.75 : 11}
          xlinkHref="#sidebar-radial-gradient"
        />
        <radialGradient
          id="sidebar-radial-gradient-6"
          cx="17.25"
          cy="399.75"
          r={props.frameState === 5 ? 16.75 : 11}
          xlinkHref="#sidebar-radial-gradient"
        />
        <radialGradient
          id="sidebar-radial-gradient-7"
          cx="17.25"
          cy="476.25"
          r={props.frameState === 6 ? 16.75 : 11}
          xlinkHref="#sidebar-radial-gradient"
        />
      </defs>
      <g id="sidebarlayer2" data-name="Layer 2">
        <g id="Layer_2Bullets" data-name="Layer 2Bullets">
          <circle
            className={classes.sidebarcls1}
            cx="17.25"
            cy="93.75"
            r={props.frameState === 1 ? 16.75 : 11}
          />
          <circle
            className={classes.sidebarcls1}
            cx="17.25"
            cy="93.75"
            r={props.frameState === 1 ? 16.75 : 11}
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action: "Clicked on About Us in Sidebar-Homepage",
              });
              props.showFrame(props.frameState === 1 ? 0 : 1);
            }}
            onMouseOver={() => {
              document.getElementById("ttabout").style.opacity = 1;
            }}
            onMouseOut={() => {
              document.getElementById("ttabout").style.opacity = 0;
            }}
          />
          <circle
            className={classes.sidebarcls2}
            cx="17.25"
            cy="17.25"
            r={props.frameState === 0 ? 16.75 : 11}
          />
          <circle
            className={classes.sidebarcls2}
            cx="17.25"
            cy="17.25"
            r={props.frameState === 0 ? 16.75 : 11}
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action: "Clicked on Home in Sidebar-Homepage",
              });
              props.showFrame(0);
            }}
            onMouseOver={() => {
              document.getElementById("tthome").style.opacity = 1;
            }}
            onMouseOut={() => {
              document.getElementById("tthome").style.opacity = 0;
            }}
          />
          <circle
            className={classes.sidebarcls3}
            cx="17.25"
            cy="170.25"
            r={props.frameState === 2 ? 16.75 : 11}
          />
          <circle
            className={classes.sidebarcls3}
            cx="17.25"
            cy="170.25"
            r={props.frameState === 2 ? 16.75 : 11}
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action: "Clicked on Growth in Sidebar-Homepage",
              });
              props.showFrame(props.frameState === 2 ? 0 : 2);
            }}
            onMouseOver={() => {
              document.getElementById("ttgrowth").style.opacity = 1;
            }}
            onMouseOut={() => {
              document.getElementById("ttgrowth").style.opacity = 0;
            }}
          />
          <circle
            className={classes.sidebarcls4}
            cx="17.25"
            cy="246.75"
            r={props.frameState === 3 ? 16.75 : 11}
          />
          <circle
            className={classes.sidebarcls4}
            cx="17.25"
            cy="246.75"
            r={props.frameState === 3 ? 16.75 : 11}
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action: "Clicked on Theme in Sidebar-Homepage",
              });
              props.showFrame(props.frameState === 3 ? 0 : 3);
            }}
            onMouseOver={() => {
              document.getElementById("tttheme").style.opacity = 1;
            }}
            onMouseOut={() => {
              document.getElementById("tttheme").style.opacity = 0;
            }}
          />
          <circle
            className={classes.sidebarcls5}
            cx="17.25"
            cy="323.25"
            r={props.frameState === 4 ? 16.75 : 11}
          />
          <circle
            className={classes.sidebarcls5}
            cx="17.25"
            cy="323.25"
            r={props.frameState === 4 ? 16.75 : 11}
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action: "Clicked on Initiatives in Sidebar-Homepage",
              });
              props.showFrame(props.frameState === 4 ? 0 : 4);
            }}
            onMouseOver={() => {
              document.getElementById("ttinitiat").style.opacity = 1;
            }}
            onMouseOut={() => {
              document.getElementById("ttinitiat").style.opacity = 0;
            }}
          />
          <circle
            className={classes.sidebarcls6}
            cx="17.25"
            cy="399.75"
            r={props.frameState === 5 ? 16.75 : 11}
          />
          <circle
            className={classes.sidebarcls6}
            cx="17.25"
            cy="399.75"
            r={props.frameState === 5 ? 16.75 : 11}
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action: "Clicked on Sponsors in Sidebar-Homepage",
              });
              props.showFrame(props.frameState === 5 ? 0 : 5);
            }}
            onMouseOver={() => {
              document.getElementById("ttspons").style.opacity = 1;
            }}
            onMouseOut={() => {
              document.getElementById("ttspons").style.opacity = 0;
            }}
          />
          <circle
            className={classes.sidebarcls7}
            cx="17.25"
            cy="476.25"
            r={props.frameState === 6 ? 16.75 : 11}
          />
          <circle
            className={classes.sidebarcls7}
            cx="17.25"
            cy="476.25"
            r={props.frameState === 6 ? 16.75 : 11}
            onClick={() => {
              ReactGa.event({
                category: "Click",
                action: "Clicked on Newsletters in Sidebar-Homepage",
              });
              props.showFrame(props.frameState === 6 ? 0 : 6);
            }}
            onMouseOver={() => {
              document.getElementById("ttnewslet").style.opacity = 1;
            }}
            onMouseOut={() => {
              document.getElementById("ttnewslet").style.opacity = 0;
            }}
          />
        </g>
      </g>
    </svg>
  </>
);

export default Sidebar;
