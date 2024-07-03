const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
 

  if (!Validator.isEmail(data.email)) {
    errors.emailsignin = "Please enter a valid email address";
  }

  if (Validator.isEmpty(data.email)) {
    errors.emailsignin = "Email field is required";
  }

  

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
