import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Homepage from "./sections/Homepage/Homepage.jsx";
// import Event_24 from "./sections/Event/Event_24.jsx";
import Navbar from "./sections/Navbar/Navbar.jsx";
import Profile from "./sections/Profile/Profile.jsx";
import Signup from "./sections/Signup/Signup.jsx";
import SignIn from "./sections/Signin/SignInNew.jsx";
import Events from "./Components/Events/Events.jsx";
import Accommodation from "./sections/Accommodation/Accommodation.jsx";
import Register from "./sections/Accommodation/Register.jsx";
import FAQ from "./sections/Accommodation/FAQ.jsx";
import About from "./sections/Accommodation/About.jsx";
import Instructions from "./sections/Accommodation/Instructions.jsx";
import MapKgp from "./sections/Accommodation/MapKgp.jsx";
import AccoGuide from "./sections/Accommodation/AccoGuide.jsx";
import ContactUs from "./sections/ContactUs/ContactUs.jsx";
import CompetitionCard from "./Components/Events/Carousel/competitionCard.jsx";
import Error from "./sections/Error/Error.jsx";
import Dashboard from "./Components/Dashboard/index.jsx";
import Newdashboard from "./sections/Dashboard/Dashboard.jsx";
import Admin from "./Containers/MainLayout/index.jsx";
import ComingSoon from "./sections/ComingSoon/ComingSoon.jsx";
import Workshop from "./sections/Workshop/Workshop.jsx";
import Registration from "./Components/Events/event_page/registration";
// import Gamefest from "./sections/Gamefest/Gamefest.jsx"
import Games from "./Components/Events/gamefest/game_page/gameregistration/index.jsx";
import GamefestNew from "./Components/Events/gamefest/GamefestNew";
import GuestLecture from "./sections/Guestlecture/Guestlecture.jsx";
import Exhibitions from "./sections/Exhibitions/Exhibitions";
import Sponsors from "./Components/Sponsors/Spons.jsx";
import MegaShow from "./sections/MegaShow/MegaShow.jsx";
// import { SponsorYear } from "./Components/Sponsors/SponsorYear.jsx";
import Schedule from "./sections/Schedule/Schedule.jsx";

import routes from "./Components/RoutesConfig.jsx";
import Interactivesessions from "./sections/Interactivesessions/Interactivesessions.jsx";

import ForgotPassword from "./sections/Signin/Forgotpassword.jsx";
const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const issues = useSelector((state) => state.issues);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Dashboard" element={<Newdashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/contactpage" element={<ContactUs />} />
        <Route path="/event/:compId" element={<CompetitionCard />} />
        <Route path="/register/:id" element={<Registration />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/accommodation/Register" element={<Register />} />
        <Route path="/accommodation/About" element={<About />} />
        <Route path="/accommodation/FAQ" element={<FAQ />} />
        <Route path="/accommodation/ContactUs" element={<ContactUs />} />
        <Route path="/accommodation/Instructions" element={<Instructions />} />
        <Route path="/accommodation/MapKgp" element={<MapKgp />} />
        <Route path="/accommodation/AccoGuide" element={<AccoGuide />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/gamefest" element={<GamefestNew />} />
        <Route path="/game-register/:id" element={<Games />} />
        <Route path="/events/gamefest" element={<GamefestNew />} />
        <Route path="/guestlecture" element={<GuestLecture />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/megashow" element={<MegaShow />} />

        <Route path="/admin-panelktj2024" element={<Admin />} />
        <Route path="/Interactivesessions" element={<Interactivesessions />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((childRoute) => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
          </Route>
        ))}
        <Route path="/admin-panelktj2024/dashboard" element={<Dashboard />} />
        {/* <Route path="/admin-panelktj2024/games" element={<Gamefest />} /> */}
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
