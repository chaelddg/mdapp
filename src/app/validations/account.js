import Validator from 'validator'

export default function validateInput(data, type) {
  let errors = {};

  if (Validator.isEmpty(data.first_name.trim())) {
    errors.first_name = 'First Name is required';
  }
  if (Validator.isEmpty(data.last_name.trim())) {
    errors.last_name = 'Last Name is required';
  }
  if (!Validator.isEmail(data.email.trim())) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email.trim())) {
    errors.email = 'Email is required';
  }
  if (Validator.isEmpty(data.phone_number.trim())) {
    errors.phone_number = 'Phone Number is required';
  }
  if (Validator.isEmpty(data.account_role.trim())) {
    errors.account_role = 'Account Role is required';
  }
  if (Validator.isEmpty(data.account_status.trim())) {
    errors.account_status = 'Account Status is required';
  }
  if (Validator.isEmpty(data.password.trim())) {
    errors.password = 'Password is required';
  }
  if (Validator.isEmpty(data.password2.trim())) {
    errors.password2 = 'Password is required';
  }

  if (data.password.trim() && !Validator.matches(data.password.trim(), '(?=.*[0-9])(?=.*[A-Z]).{6,}$')) {
    errors.password = `Must be at least 6 characters, and contain 1 Numeric and 1 Uppercase`;
  }

  if (data.password.trim() && data.password.trim()) {
    if (!Validator.equals(data.password2.trim(), data.password.trim())) {
      errors.password = 'Password is not matched';
      errors.password2 = 'Password is not matched';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
