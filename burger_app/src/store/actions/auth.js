import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRzkIVZol-9c3fjSnB1xTyz_q5PovYxAs';
		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRzkIVZol-9c3fjSnB1xTyz_q5PovYxAs';
		}
		axios
			.post(url, authData)
			.then(response => {
				console.log(response);
				const {localId, idToken} = response.data;
				dispatch(authSuccess(idToken, localId));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
