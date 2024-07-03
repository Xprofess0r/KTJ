const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegistrationInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.gender = !isEmpty(data.gender) ? data.gender.trim() : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.college = !isEmpty(data.college) ? data.college : "";
  data.collegeid = !isEmpty(data.collegeid) ? data.collegeid : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.conpassword = !isEmpty(data.conpassword) ? data.conpassword : "";

  /*---------------   Input validation Starts ---------------*/

  if (!Validator.isLength(data.username, { min: 4, max: 60 })) {
    errors.username = "Name must be between 3 and 60 characters";
  }

  if (!Validator.isAlpha(Validator.blacklist(data.username, " "))) {
    errors.username = "Name must contain only Alphabets";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Name field is required";
  }

  if (
    !(
      data.gender.toUpperCase() == "MALE" ||
      data.gender.toUpperCase() == "FEMALE" ||
      data.gender.toUpperCase() == "OTHER"
    )
  ) {
    errors.gender = "'MALE', 'FEMALE' or 'OTHER' are valid";
  }

  if (Validator.isInt(data.gender)) {
    errors.gender = "Gender field must contain only alphabets";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (!Validator.isLength(data.phone, { min: 10, max: 10 })) {
    errors.phone = "Incorrect Phone Number(must be 10 digits)";
  }

  if (!Validator.isInt(data.phone)) {
    errors.phone = "Phone number field has non-integer input";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone Number field is required";
  }

  if (Validator.isEmpty(data.college)) {
    errors.college = "College field is required";
  }

  if (Validator.isEmpty(data.collegeid)) {
    errors.collegeid = "College id field is required";
  }

  if (Validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }

  if (!Validator.isAlpha(Validator.blacklist(data.city, " "))) {
    errors.city = "City must contain only Alphabets";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }

  if (!Validator.isAlpha(Validator.blacklist(data.state, " "))) {
    errors.state = "State must contain only Alphabets";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email Id";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.conpassword)) {
    errors.conpassword = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.conpassword)) {
    errors.password = "Password and Confirm Password must match";
    errors.conpassword = "Password and Confirm Password, both must match";
  }

  /*---------------   Input validation Ends ---------------*/

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
