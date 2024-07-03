// import { Link} from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "../Navbar/Navbar.module.css";
import logo from "../../images/KTJ-logo-main.png";
import hamburger from "../../images/hamburger-menu.png";
import { createElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { AiFillCaretRight } from "react-icons/ai";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const scrollup=()=>{
    window.scrollTo(0, 0);
  }

  const mobileDropdownHandler = (event) => {
    const a = event.target;
    const b = a.nextSibling;
    if (!b.style.maxHeight) {
      // console.log('open now')
      b.style.maxHeight = "50vh";
      b.style.paddingTop = "1rem"
      const icon = a.childNodes[1];
      icon.setAttribute("transform", "rotate(-90)");
      return;
    }

    const height = b.style.maxHeight;

    if (!height || height === "0vh") {
      // console.log('open now')
      b.style.maxHeight = "50vh";
      b.style.paddingTop = "1rem"
      // console.log(a.childNodes) ;
      const icon = a.childNodes[1];
      // console.log(icon);
      icon.setAttribute("transform", "rotate(-90)");
    } else {
      // console.log('close now');
      b.style.maxHeight = "0vh";
      b.style.paddingTop = "0"
      const icon = a.childNodes[1];
      // console.log(icon);
      icon.setAttribute("transform", "rotate(0)");
    }
  };

  return (
    <div id="navbar" className={classes.navContainer}>
      <ul className={classes["navbar"]}>
        <li>
          <Link to="/" onClick={scrollup}>
            <div className={classes.logo}>
              <img src={logo} alt="KTJ-logo" />
            </div>
          </Link>
        </li>
        <li>
          <Link to="/schedule" onClick={scrollup}>
            <div className={classes.navElem}>SCHEDULE</div>
          </Link>
        </li>
        <li>
          <div className={classes.navDropdown}>
            <span className={classes.navElem}>Activities</span>
            <div className={classes.dropdownContent}>
              <p>
                <Link to="/workshop" onClick={scrollup}>
                  <div className={classes.navElem}>Workshop</div>
                </Link>
              </p>
              <p>
                <Link to="/events" onClick={scrollup}>
                  <div className={classes.navElem}>Competitions</div>
                </Link>
              </p>
              <p>
                <Link to="/gamefest" onClick={scrollup}>
                  <div className={classes.navElem}>Gamefest</div>
                </Link>
              </p>
              <p>
                <Link to="/summits" onClick={scrollup}>
                  <div className={classes.navElem}>Summit</div>
                </Link>
              </p>
            </div>
          </div>
        </li>
        {/* <li>
          <Link to="/events">
            <div className={classes.navElem}>EVENTS</div>
          </Link>
        </li> */}
        <li>
          <Link to="/sponsors" onClick={scrollup}>
            <div className={classes.navElem}>SPONSORS</div>
          </Link>
        </li>
        <li>
          <Link to="/contactpage" onClick={scrollup}>
            <div className={classes.navElem}>CONTACT US</div>
          </Link>
        </li>
        <li>
          <div className={classes.navDropdown}>
            <span className={classes.navElem}>INNOVATIVE CORNER</span>
            <div className={classes.dropdownContent}>
              <p>
                <Link to="/interactivesession" onClick={scrollup}>
                  <div className={classes.navElem}>Interactive Sessions</div>
                </Link>
              </p>
              <p>
                <Link to="/exhibitions" onClick={scrollup}>
                  <div className={classes.navElem}>Exhibitions</div>
                </Link>
              </p>
              <p>
                <Link to="/guestLecture" onClick={scrollup}>
                  <div className={classes.navElem}>Guest Lectures</div>
                </Link>
              </p>
            </div>
          </div>

        </li>
        <li>
          <Link to="/accommodation" onClick={scrollup}>
            <div className={classes.navElem}>ACCOMMODATION</div>
          </Link>
        </li>


        {auth?.user.userType == "superAdmin" ||
          auth?.user.userType == "admin" ? (
          <li>
            <Link
              onClick={() => {
                window.scroll({ left: 0, top: 0, behavior: "smooth" });
                // google_analy('Clicked on Admin-panel in the navbar')
                window.scroll({ left: 0, top: 0, behavior: "smooth" });
              }}
              to="/admin-panelktj2024"
              exact
            >
              <div className={classes.linkboxinner}>Admin</div>
            </Link>
          </li>
        ) : null}

        {auth.isAuthenticated ? (
          <ul className={classes.navElem}>
            <li>
              <Link to="/profile" onClick={scrollup}>
                <div className={classes.navElem}>PROFILE</div>
              </Link>
            </li>
            <li>
              <div onClick={handleLogout} className={classes.navElem}>
                LOGOUT
              </div>
            </li>
          </ul>
        ) : (
          <ul className={classes.navElem}>
            <li className={classes.navElem}>
              <Link to="/signin" onClick={scrollup}>
                <div className={classes.navElem}>SIGN IN</div>
              </Link>
            </li>
            <li className={classes.navElem}>
              <Link to="/signup" onClick={scrollup}>
                <div className={classes.navElem}>SIGN UP</div>
              </Link>
            </li>
          </ul>
        )}

        <li className={classes.hamBurger}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 0H192V51.2C119 66 64 130.6 64 208v88L0 368v48H448V368l-64-72V208c0-77.4-55-142-128-156.8V0zm32 448H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
          </svg>
          <img
            src={hamburger}
            style={{ cursor: "pointer" }}
            alt="navbar"
            onClick={() => {
              setOpen(true);
            }}
          />
        </li>
      </ul>
      <div className={classes.navContainer1}>
        <div
          className={open ? `${classes.sideMenu}` : `${classes.sideMenuclosed}`}
        >
          <div
            className={classes.sideMenuDivLeft}
            onClick={() => setOpen(false)}
          ></div>
          <div className={classes.sideMenuDivRight}>
            <div className={classes.sideMenuUpper}>
              <svg
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpen(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
              </svg>
            </div>
            <div className={classes.sideMenuLower}>
              <Link to="/" onClick={scrollup}>
                <div className={classes.sideMenuKTJName}
                  onClick={() => setOpen(false)}
                >
                  <img src={logo} alt="KTJ-logo" />
                </div>
              </Link>
              <ul className={classes.sideMenuElem}>
                <li>
                  <Link to="/schedule" onClick={scrollup}>
                    <div
                      className={classes.sideElem}
                      onClick={() => setOpen(false)}
                    >
                      SCHEDULE
                    </div>
                  </Link>
                </li>
                <li onClick={mobileDropdownHandler}>
                  <div>
                    <div
                      className={classes.navElemDropdown}
                      style={{ width: "fitContent", cursor: 'pointer' }}
                    >
                      Activities
                      <AiFillCaretRight className={classes.dropdownIcon} />
                    </div>
                    <div
                      className={classes.dropdownContentMobile}
                      style={{ padding: "0" }}
                    >
                      <p>
                        <Link to="/workshop" onClick={() => {setOpen(false); scrollup;}}>
                          <div className={classes.navElemMobile}>Workshop</div>
                        </Link>
                      </p>
                      <p>
                        <Link to="/events" onClick={() => {setOpen(false); scrollup;}}>
                          <div className={classes.navElemMobile}>
                            Competitions
                          </div>
                        </Link>
                      </p>
                      <p>
                        <Link to="/gamefest" onClick={() => {setOpen(false); scrollup;}}>
                          <div className={classes.navElemMobile}>Gamefest</div>
                        </Link>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/sponsors" onClick={scrollup}>
                    <div
                      className={classes.sideElem}
                      onClick={() => setOpen(false)}
                    >
                      SPONSORS
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/contactpage" onClick={scrollup}>
                    <div
                      className={classes.sideElem}
                      onClick={() => setOpen(false)}
                    >
                      CONTACT US
                    </div>
                  </Link>
                </li>
                <li onClick={mobileDropdownHandler}>
                  <div>
                    <div
                      className={classes.navElemDropdown}
                      style={{ width: "fitContent", cursor: 'pointer' }}
                    >
                      Innovative Corner
                      <AiFillCaretRight className={classes.dropdownIcon} />
                    </div>
                    <div
                      className={classes.dropdownContentMobile}
                      style={{ padding: "0" }}
                    >
                      <p>
                        <Link to="/interactivesession" onClick={() => {setOpen(false); scrollup;}}>
                          <div className={classes.navElemMobile}>Interactive Sessions</div>
                        </Link>
                      </p>
                      <p>
                        <Link to="/exhibitions" onClick={() => {setOpen(false); scrollup;}}>
                          <div className={classes.navElemMobile}>Exhibitions</div>
                        </Link>
                      </p>
                      <p>
                        <Link to="/guestLecture" onClick={() => {setOpen(false); scrollup;}}>
                          <div className={classes.navElemMobile}>Guest Lectures</div>
                        </Link>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/accommodation">
                    <div
                      className={classes.sideElem}
                      onClick={() => {setOpen(false); scrollup;}}>
                      ACCOMMODATION
                    </div>
                  </Link>
                </li>

                {auth.isAuthenticated ? (
                  <ul>
                    <li>
                      <Link to="/profile" onClick={scrollup}>
                        <div className={classes.sideElem}
                          onClick={() => setOpen(false)}>PROFILE</div>
                      </Link>
                    </li>
                    <br color="#CD8786" />
                    <li>
                      <Link to="#">
                        <div onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                          className={classes.sideElem}>LOGOUT</div>
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <Link to="/signin" onClick={scrollup}>
                        <div
                          className={classes.sideElem}
                          onClick={() => setOpen(false)}
                        >
                          SIGN IN
                        </div>
                      </Link>
                    </li>
                    <br color="#CD8786" />
                    <li>
                      <Link to="/signup" onClick={scrollup}>
                        <div
                          className={classes.sideElem}
                          onClick={() => setOpen(false)}
                        >
                          SIGN UP
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
