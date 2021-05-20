import reducer from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

describe('burger builder reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			ingredients: null,
			totalPrice: 4,
			error: false,
			building: false
		});
	});

	it('should set value of ingredients to 0 at set ingredients', () => {
		expect(
			reducer(
				{
					ingredients: null,
					totalPrice: 4,
					error: false,
					building: false
				},
				{
					type: actionTypes.SET_INGREDIENTS,
					ingredients: { salad: 0, bacon: 0, meat: 0, cheese: 0 }
				}
			)
		).toEqual({
			ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
			totalPrice: 4,
			error: false,
			building: false
		});
	});
});
