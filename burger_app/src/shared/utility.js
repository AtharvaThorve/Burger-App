export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties
	}
}

export const checkValidity = (value, rules) => {
	let isValid = true;
	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.isEmail) {
		// eslint-disable-next-line
		const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		isValid = pattern.test(value) && value;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	return isValid;
}