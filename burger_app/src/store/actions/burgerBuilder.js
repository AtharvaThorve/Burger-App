import * as actionTypes from './actionTypes'

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingridentName: name
	}
}

export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingridentName: name
	}
}