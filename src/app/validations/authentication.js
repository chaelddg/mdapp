import Validator from 'validator'

export default function validateInput(data, type) {
	let errors = {};

	if (!Validator.isEmail(data.email.trim())) {
		errors.email = 'Email is invalid';
	}
	if (Validator.isEmpty(data.email.trim())) {
		errors.email = 'Email is required';
	}
	if (Validator.isEmpty(data.password.trim())) {
		errors.password = 'Password is required';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	};
}
