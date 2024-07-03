import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions.js'
import Form from './Signupform24.jsx'
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

function signup24({registerUser , auth, errors, loading, history}) {

    // state for form data
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        gender: "",
        phone: "",
        college: "",
        collegeid: "",
        department: "",
        city: "",
        state: "",
        password: "",
        conpassword: "",
    })


    //simple client side validation
    const preValidate = () => {
        return []
    }

    let navigate = useNavigate();

    //fired when user clicks "Sign Up" button
    const handleSubmit = async () => {
        const validationErrors = preValidate();

        // handle validation errors
        if (validationErrors.length > 0) {


            return;
        }

        await registerUser(formData, history)
        console.log(auth);
        console.log(errors);
        // console.log()
    }

      //logging the user out
    
    //if signed up, redirect
    useEffect(() => {
      if (auth.isAuthenticated) {
          navigate("/profile")
      }
  }, [auth,navigate])

  return (
    <>
        <Form
            formData={formData}
            setFormData={setFormData}
            submitAct={handleSubmit}
            formErrors={errors}
            loading={loading}
        />
    </>
  )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    loading: state.auth.loading,
  })

export default connect(mapStateToProps, { registerUser })(withRouter(signup24))