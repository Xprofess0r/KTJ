import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Sling as Hamburger } from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { FaCaretRight } from "react-icons/fa";
import KTJLogo from "../../images/Asset 24.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropped1, setIsDropped1] = useState(false);
  const [isDropped2, setIsDropped2] = useState(false);
  const hbmenuRef = useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const hbmenu = hbmenuRef.current;
      const hb = document.getElementsByClassName(styles.hb)[0];

      if (
        hbmenu &&
        hb &&
        !hbmenu.contains(event.target) &&
        !hb.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    hbmenuRef.current.classList.remove(styles.toggled);
    var dd1 = document.getElementsByClassName(styles.hbDropDown1)[0];
    var dd2 = document.getElementsByClassName(styles.hbDropDown2)[0];
    var ar1 = document.getElementsByClassName(styles.ddArrow1)[0];
    var ar2 = document.getElementsByClassName(styles.ddArrow2)[0];
    if (dd1) {
      dd1.classList.remove(styles.droppedDown);
      setIsDropped1(false);
    }
    if (ar1) {
      ar1.classList.remove(styles.arRtoD);
    }
    if (dd2) {
      dd2.classList.remove(styles.droppedDown);
      setIsDropped2(false);
    }
    if (ar2) {
      ar2.classList.remove(styles.arRtoD);
    }
  };

  const toggleDropDown1 = () => {
    var dd1 = document.getElementsByClassName(styles.hbDropDown1)[0];
    var dd2 = document.getElementsByClassName(styles.hbDropDown2)[0];
    var ar1 = document.getElementsByClassName(styles.ddArrow1)[0];
    var ar2 = document.getElementsByClassName(styles.ddArrow2)[0];

    if (isDropped1) {
      setIsDropped1(false);
      if (dd1) {
        dd1.classList.remove(styles.droppedDown);
        if (ar1) {
          ar1.classList.remove(styles.arRtoD);
          console.log("rotated");
        }
        console.log("isDropped1 and removed droppedDown from 1" + isDropped1);
      }
    } else {
      if (isDropped2) {
        setIsDropped2(false);
        if (dd2) {
          dd2.classList.remove(styles.droppedDown);
          if (ar2) {
            ar2.classList.remove(styles.arRtoD);
            console.log("rotated");
          }
          console.log("!isDropped1 isDropped2 and removed droppedDown from 2");
        }
      }
      setIsDropped1(true);
      if (dd1) {
        dd1.classList.add(styles.droppedDown);
        if (ar1) {
          ar1.classList.add(styles.arRtoD);
          console.log("rotated");
        }
        console.log("!isDropped1 and added droppedDown to 1");
      }
    }
  };

  const toggleDropDown2 = () => {
    var dd1 = document.getElementsByClassName(styles.hbDropDown1)[0];
    var dd2 = document.getElementsByClassName(styles.hbDropDown2)[0];
    var ar1 = document.getElementsByClassName(styles.ddArrow1)[0];
    var ar2 = document.getElementsByClassName(styles.ddArrow2)[0];

    if (isDropped2) {
      setIsDropped2(false);
      if (dd2) {
        dd2.classList.remove(styles.droppedDown);
        ar2.classList.remove(styles.arRtoD);
      }
    } else {
      if (isDropped1) {
        setIsDropped1(false);
        if (dd1) {
          dd1.classList.remove(styles.droppedDown);
          ar1.classList.remove(styles.arRtoD);
        }
      }
      setIsDropped2(true);
      if (dd2) {
        dd2.classList.add(styles.droppedDown);
        ar2.classList.add(styles.arRtoD);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLogoutNCloseMenu = () => {
    closeMenu();
    handleLogout();
  };

  return (
    <>
      <div className={styles.hb}>
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          direction="right"
          duration={0.3}
          distance="lg"
          color="#2affff"
          easing="ease-in"
          rounded
          label="Show menu"
          hideOutline={false}
          onToggle={(toggled) => {
            if (toggled) {
              hbmenuRef.current.classList.add(styles.toggled);
            } else {
              closeMenu();
            }
          }}
        />
      </div>
      <nav className={styles.navbar} id="navbar">
        <Link to="/" className={styles.linkLogo}>
          <img src={KTJLogo} alt="KTJLogo" className={styles.KTJLogo} />
        </Link>
        <div className={styles.links}>
          <Link to="/schedule">SCHEDULE</Link>
          <div className={styles.dropdownContainer}>
            <Link className={styles.dropLink}>
              ACTIVITIES
              <div className={styles.dropdownContent}>
                <li className={styles.fromLeft} onClick={console.log('workshop')}>
                  <Link to="/workshop">WORKSHOP</Link>
                </li>
                <li className={styles.fromRight}>
                  <Link to="/events">COMPETITIONS</Link>
                </li>
                <li className={styles.fromLeft}>
                  <Link to="/gamefest">GAMEFEST</Link>
                </li>
                <li className={styles.fromRight}>
                  <Link to="/megashow">MEGASHOWS</Link>
                </li>
                {/* <li className={styles.fromRight}>
                  <Link to="https://relic.ktj.in/" target="_blank" rel="noopener noreferrer">MEGASHOWS</Link>
                </li> */}
                {/* <li className={styles.fromLeft}>
                  <a href="https://relic.ktj.in/" target="_blank" rel="noopener noreferrer">RELIC HUNTER</a>
                </li> */}
              </div>
            </Link>
          </div>
          <Link to="/sponsors">SPONSORS</Link>
          <div className={styles.dropdownContainer}>
            <Link className={styles.dropLink}>
              INNOVATION CORNER
              <div className={styles.dropdownContent}>
                <li className={styles.fromLeft}>
                  <Link to="/Interactivesessions">INTERACTIVE SESSIONS</Link>
                </li>
                <li className={styles.fromRight}>
                  <Link to="/exhibitions">EXHIBITIONS</Link>
                </li>
                <li className={styles.fromLeft}>
                  <Link to="/guestlecture">GUEST LECTURES</Link>
                </li>
              </div>
            </Link>
          </div>
          <Link to="/Accommodation">ACCOMMODATION</Link>
          <Link to="/contactpage">CONTACT US</Link>
          {auth?.user.userType == "superAdmin" ||
          auth?.user.userType == "admin" ? (
            <Link to="/admin-panelktj2024" exact>
              Admin
            </Link>
          ) : null}

          {/* <li>
            <Link to="/profile">
              <div className={classes.navElem}>PROFILE</div>
            </Link>
          </li>
          <li>
            <div onClick={handleLogout} className={classes.navElem}>
              LOGOUT
            </div>
          </li> */}

          {auth.isAuthenticated ? (
            <>
              <Link to="/profile" style={{ fontWeight: 600 }}>
                PROFILE
              </Link>
              <Link
                to="/Signin"
                onClick={handleLogout}
                style={{ fontWeight: 600, paddingRight: "2rem" }}
              >
                LOGOUT
              </Link>
            </>
          ) : (
            <>
              {/* <Link to="/Signup" style={{ fontWeight: 600 }}>
                SIGN UP
              </Link> */}
              <Link
                to="/Signin"
                style={{ fontWeight: 600, paddingRight: "2rem" }}
              >
                LOG IN
              </Link>
            </>
          )}

          {/* <Link to="/Signup" style={{ fontWeight: 600 }}>
            SIGN UP
          </Link>
          <Link to="/Signin" style={{ fontWeight: 600, paddingRight: "2rem" }}>
            SIGN IN
          </Link> */}
        </div>
      </nav>
      <div ref={hbmenuRef} className={styles.hbmenu}>
        <div className={styles.links}>
          <Link to="/" onClick={closeMenu} className={styles.linkLogohb}>
            <img src={KTJLogo} alt="KTJLogo" className={styles.KTJLogo} />
          </Link>
          <Link to="/comingsoon" onClick={closeMenu}>
            SCHEDULE
          </Link>
          <div className={styles.dropdownContainer}>
            <Link
              className={styles.dropLink}
              onClick={(e) => {
                e.preventDefault();
                toggleDropDown1();
              }}
            >
              ACTIVITIES <FaCaretRight className={styles.ddArrow1} />
            </Link>
            <div className={styles.list + " " + styles.hbDropDown1}>
              <li>
                <Link to="/workshop" onClick={closeMenu}>
                  WORKSHOP
                </Link>
              </li>
              <li>
                <Link to="/events" onClick={closeMenu}>
                  COMPETITIONS
                </Link>
              </li>
              <li>
                <Link to="/gamefest" onClick={closeMenu}>
                  GAMEFEST
                </Link>
              </li>
              <li>
                <Link to="/megashow" onClick={closeMenu}>
                  MEGASHOWS
                </Link>
              </li>
              <li>
                <a href="https://relic.ktj.in/" onClick={closeMenu} target="_blank" rel="noopener noreferrer">
                  RELIC HUNTER
                </a>
              </li>
            </div>
          </div>
          <Link to="/sponsors" onClick={closeMenu}>
            SPONSORS
          </Link>
          <div className={styles.dropdownContainer}>
            <Link
              className={styles.dropLink}
              onClick={(e) => {
                e.preventDefault();
                toggleDropDown2();
              }}
            >
              INNOVATION CORNER <FaCaretRight className={styles.ddArrow2} />
            </Link>
            <div className={styles.list + " " + styles.hbDropDown2}>
              <li>
                <Link to="/Interactivesessions" onClick={closeMenu}>
                  INTERACTIVE SESSIONS
                </Link>
              </li>
              <li>
                <Link to="/exhibitions" onClick={closeMenu}>
                  EXHIBITIONS
                </Link>
              </li>
              <li>
                <Link to="/guestlecture" onClick={closeMenu}>
                  GUEST LECTURES
                </Link>
              </li>
            </div>
          </div>
          <Link to="/Accommodation" onClick={closeMenu}>
            ACCOMMODATION
          </Link>
          <Link to="/contactpage" onClick={closeMenu}>
            CONTACT US
          </Link>
          {auth?.user.userType == "superAdmin" ||
          auth?.user.userType == "admin" ? (
            <Link to="/admin-panelktj2024" exact onClick={closeMenu}>
              Admin
            </Link>
          ) : null}
          {auth.isAuthenticated ? (
            <>
              <Link
                to="/profile"
                style={{ fontWeight: 600 }}
                onClick={closeMenu}
              >
                PROFILE
              </Link>
              <Link
                to="/Signin"
                onClick={handleLogoutNCloseMenu}
                style={{ fontWeight: 600 }}
              >
                LOGOUT
              </Link>
            </>
          ) : (
            <>
              {/* <Link to="/Signup" style={{ fontWeight: 600 }} onClick={closeMenu}>
                SIGN UP
              </Link> */}
              <Link
                to="/Signin"
                style={{ fontWeight: 600 }}
                onClick={closeMenu}
              >
                LOG IN
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
