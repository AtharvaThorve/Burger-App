import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingridentName: name
	};
};

export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingridentName: name
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const fetchedIngredientsFailed = () => {
	return {
		type: actionTypes.FETCHED_INGREDIENTS_FAILED
	};
};

export const initIngredients = () => {
	return dispatch => {
		axios
			.get('/ingredients.json')
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(error => {
				dispatch(fetchedIngredientsFailed());
			});
	};
};
