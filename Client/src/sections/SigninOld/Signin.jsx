import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions.js'
import Form from './SignInNewForm.jsx'
import {
    useLocation,
    useNavigate,
    useParams,
    redirect
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

function Signin({loginUser , auth, errors, loading, history}) {

    // state for form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })


    //simple client side validation
    const preValidate = () => {
        return []
    }

    let navigate = useNavigate();

    //fired when user clicks "Sign In" button
    const handleSubmit = async () => {
        const validationErrors = preValidate();

        // handle validation errors
        if (validationErrors.length > 0) {


            return;
        }



        await loginUser(formData, history)
        console.log(errors);
        console.log(auth);



    }

    //logging the user out
    auth.isAuthenticated = false;

    //if signed in, redirect
    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/")
        }
    }, [auth])

  return (
    <>
        <Form
            formData={formData}
            setFormData={setFormData}
            submitAct={handleSubmit}
            formErrors={errors}
        />
    </>
  )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    loading: state.auth.loading,
  })

export default connect(mapStateToProps, { loginUser })(withRouter(Signin))