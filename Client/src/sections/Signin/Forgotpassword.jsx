import React, { Component } from 'react';
// import Classes from './forgotpassword.module.css';
import Classes from './Forgotpassword.module.css'
// import Vdo from '../vdoplayer/Vdo';
import ReactGa from 'react-ga';
import { message } from 'antd';
import { TailSpin } from 'react-loading-icons';
// import Button from '@material-ui/core/Button';

// import isEmpty from '../../validation/isEmpty';
import { forgetPassword } from '../../actions/authActions';
// import PageWrapper from '../PageWrapper/PageWrapper';

class ForgotPassword extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {},
      outputMessage: 'nil',
      isTrue: true,
      loading: false,
    };
    this.setState = this.setState.bind(this);
  }

  updateState(message) {
    // Changing state
    this.setState({
      outputMessage: message,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => { };

  submitform = async (e) => {
    e.preventDefault();
    ReactGa.event({
      category: 'Click',
      action: 'Clicked on Forgot Password in forgotpasswordpage',
    });
    let email = document.getElementById('email').value;
    if (email === '') {
      message.error("Please enter your email");
      return;
    }
  
    this.setState({ loading: true });
  
    try {
      await forgetPassword({ email });
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error in forgetPassword:', error);
      // Handle error if needed
    } finally {
      this.setState({ loading: false });
    }
  };
  


  render() {
    return (
      // <PageWrapper>

      <div className={Classes.head}>
        <div className={Classes.signOuter}>
          <form className={Classes.formOuter}>
            <img
              className={Classes.headingimg}
              src="https://i.postimg.cc/1XsKY7T8/kshitij.png"
              alt="heading"
            />
            <input
              type='text'
              className={Classes.Email}
              placeholder='Email'
              id='email'
            ></input>
            {this.state.loading ? (
              <button className={Classes.formSubmit}> <TailSpin width="20" height="20" style={{ fill: "black" }} /></button>
            ) : (
              <button onClick={this.submitform} className={Classes.formSubmit}> Send Email</button>
            )}
          </form>
        </div>
        {/* <Vdo /> */}
        {/* </PageWrapper> */}
      </div>
    );
  }
}

export default ForgotPassword;
