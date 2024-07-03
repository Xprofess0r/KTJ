import { Component } from "react";
import classes from "./SignInNew.module.css";
import ReactGa from "react-ga";
import { Link } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { TailSpin } from "react-loading-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

class SignInNewForm extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
      show: false,
    };
  }

  // Getting errors from backend and updating when new errors arrive
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  render() {
    let errors = this.props.errors;
    let errordisplayEmail = "";
    let errordisplayPassword = "";
    let classesEmail = `${classes.formInput} `;
    let classesPassword = `${classes.formInput} `;

    if (errors.emailsignin) {
      classesEmail = `${classesEmail}${classes.redTextField}`;
      errordisplayEmail = toast.error(errors.emailsignin);
    }
    if (errors.passwordsignin) {
      classesPassword = `${classesPassword}${classes.redTextField}`;
      errordisplayPassword = toast.error(errors.passwordsignin);
    }

    const googleSuccess = async (res) => {
      if (res) {
        this.props.googleLogin(res);
      }
    };

    const show = this.state.show;

    const googleFailure = (err) => {
      errors.emailsignin = "Error in Signing in with Google";
      console.log("google Signin was unsuccessful");
      console.log(err);
    };

    const handleToggleShow = () => {
      this.setState((prevState) => ({ show: !prevState.show }));
    };

    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />
        <div className={classes.bg1}>
          {/* <img
            className={classes.bgimg}
            src="https://i.postimg.cc/s2YjTFm5/wholebackground.png"
            alt="background"
          /> */}
          <div className={classes.robot1}></div>

          <div className={classes.form1}>
            <div className={classes.heading}>
              <img
                className={classes.headingimg}
                src="https://i.postimg.cc/1XsKY7T8/kshitij.png"
                alt="heading"
              />
            </div>

            <form
              onSubmit={(e) => {
                ReactGa.event({
                  category: "Click",
                  action: "Clicked on Sign In in Signinpage",
                });
                this.props.function(e);
              }}
            >
              <div className={classes.in_box}>
                <input
                  className={`${classes.signInInput}`}
                  type="email"
                  id="email"
                  placeholder="E-MAIL"
                  required
                />
                <span className={classes.in_icon}>
                  <i
                    className="bi bi-person-fill"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </span>
              </div>

              <br />

              <div className={classes.in_box}>
                <input
                  className={`${classes.signInInput}`}
                  type={show ? "text" : "password"}
                  id="password"
                  placeholder="PASSWORD"
                  required
                />
                <span className={classes.in_icon} onClick={handleToggleShow}>
                  {show ? (
                    <i className="bi bi-eye" style={{ fontSize: "1.5rem" }}></i>
                  ) : (
                    <i
                      className="bi bi-eye-slash"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  )}
                </span>
                {errordisplayPassword}
              </div>
              <div className={classes.forgotpassword}>
                {/* Don't have an account? <Link to="/signup">Sign Up</Link> */}
                <Link to='/resetpassword'>Forgot Password</Link>
              </div>      
              <button
                type="submit"
                className={`${classes.button} ${classes.buttonIn}`}
              >
                {this.props.loading ? (
                  <div
                    style={{
                      marginRight: "9px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TailSpin width="20" height="20" fill="black" />
                  </div>
                ) : (
                  <p>Enter</p>
                )}
              </button>
              <div
                style={{
                  zIndex: "2",
                  margin: "1rem",
                }}
              >
                <GoogleOAuthProvider clientId="542363834516-0n6avvl1qmigb1nnui20cnvfg6mdr2ar.apps.googleusercontent.com">
                  <GoogleLogin
                    width={"190"}
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    cookiePolicy="single_host_origin"
                  />
                </GoogleOAuthProvider>
              </div>
              {/* <GoogleLogin
                clientId="543780565590-ss4hetn9iorgsgvsj88n5jnuu7pr9f3c.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    type="button"
                    onClick={renderProps.onClick}
                    className={`${classes.button}`}
                    style={{
                      color: "black",
                      fontSize: "1rem",
                      fontWeight: "800",
                    }}
                  >
                    SIGN IN WITH
                    <img
                      src="https://i.postimg.cc/qqzjxj7f/google-icon-logo.png"
                      alt="google"
                    />
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              /> */}

              <br />

              <div className={classes.signup}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
                {/* <Link to='/resetpassword'> Forget Password</Link> */}
              </div>
              {/* <Link
  className={classes.forgotpassword}
  onClick={() => {
    ReactGa.event({
      category: "Click",
      action: "Clicked on Forget Password in Signinpage",
    });
  }}
  to="/resetpassword"
> */}
  
  {/* Forgot Password? */}
{/* </Link> */}

            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignInNewForm;
