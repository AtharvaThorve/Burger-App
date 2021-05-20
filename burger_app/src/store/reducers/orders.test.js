import reducer from './order';
import * as actionTypes from '../actions/actionTypes';

describe('orders reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			orders: [],
			loading: false,
			purchased: false
		});
	});
});
