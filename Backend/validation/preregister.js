const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePreRegistrationInput(data) {
  let errors = {};

  
  data.email = !isEmpty(data.email) ? data.email : "";


  /*---------------   Input validation Starts ---------------*/

 12

  if (!Validator.isEmail(data.email)) {
    errors.emailpresignup = "Invalid Email Id..";
  }

  if (Validator.isEmpty(data.email)) {
    errors.emailpresignup = "Email field is required..";
  }


  /*---------------   Input validation Ends ---------------*/

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
