import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Components/drawer/index.jsx";
import classes from "./index.module.css";
import Dashboard from "../../Components/Dashboard/index.jsx";
import { BrowserRouter,Route, Routes, Navigate, useNavigate } from "react-router-dom"; // Updated to use Routes and Navigate
// import Event from "../../Components/Event/Event";
// import Game from "../../Components/Games/Game";
// import Sponsors from "../../Components/Sponsors/Sponsors";
import Payments from "../../Components/Payments/Payments.jsx";
import GuestLectures from "../../Components/Guestlectures/Guestlectures";
// import Navbar from "../../Components/NavbarAdmin/Navbar";
import { SponsorYear } from "../../Components/Sponsors/SponsorYear";
import Competitions from "../../Components/Competitions/Competitions.jsx";
import Gamefest from "../../Components/Gamefest/Gamefest.jsx";
import Workshop from "../../Components/Workshop/Workshop.jsx";
import ActiveUsers from "../../Components/ActiveUsers/ActiveUsers";
import CustomUrl from "../../Components/CustomUrl/CustomUrl.jsx";
import Schedule from "../../Components/Schedule/Schedule";
import Interactive from "../../Components/Interactive/Interactive";
import { logoutUser } from "../../actions/authActions.js";
import Emails from "../../Components/Emails/Emails";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const { isAuthenticated, user } = auth;
    if (!isAuthenticated) {
      navigate("/signin"); // Use navigate for navigation
    } else if (isAuthenticated && user.userType === "normal") {
      navigate("/");
    }
    document.getElementById("navbar").style.display = "none";

    // return () => {
    //   if (document.getElementById("navbar")) {
    //     document.getElementById("navbar").style.display = "flex";
    //   }
    // };
  }, [auth, navigate]);

  const logout = () => {
    const { userInfo } = auth;
    dispatch(logoutUser(userInfo));
    navigate("/signin");
  };

  return (
    <>
      <Row className={classes.topHeader} justify="space-between">
        <Col span={10}>Kshitij Admin Tool</Col>
        <Col span={10}>Welcome {auth.user.username}</Col>
        <Col span={2}>
          <Button
            type="secondary"
            onClick={() => {
              navigate("/");
            }}
            style={{backgroundColor:'white'}}
          >
            Website
          </Button>
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <div>
            <Sidebar />
          </div>
        </Col>
        <Col span={20} style={{ backgroundColor: "#f5f5f5" }}>
         <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/competitions" element={<Competitions />} />
         <Route path="/games" element={<Gamefest />} />
         <Route path="/workshop" element={<Workshop />} />
         <Route path="/payments" element={<Payments />} />
         <Route path="/schedule" element={<Schedule />} />
         <Route path="/emails" element={<Emails />} />
         <Route path="/interactive" element={<Interactive />} />
         <Route path="/guestLectures" element={<GuestLectures />} />
         <Route path="/users" element={<ActiveUsers />} />
         <Route path="/customUrls" element={<CustomUrl />} />
         <Route path="/sponsors" element={<SponsorYear />} />
         {/* <Route key="2020" path="/sponsor2020">
            <Sponsors year="2020" />
          </Route>
          <Route key="2022" path="/sponsor2022">
            <Sponsors year="2022" />
          </Route>
          <Route key="2024" path="/sponsor2024">
            <Sponsors year="2024" />
          </Route> */}
         </Routes>
            
  
        </Col>
      </Row>
    </>
  );
  
};

export default MainLayout;