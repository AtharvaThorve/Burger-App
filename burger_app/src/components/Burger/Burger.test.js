import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Burger from './Burger';

configure({ adapter: new Adapter() });

describe('<Burger />', () => {
	let ingredients = {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	};
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Burger ingredients={ingredients} />);
	});

	it('should contain "Please start adding ingredients" when no ingredients are passed', () => {
		expect(
			wrapper.contains(<p>Please start adding ingredients!</p>)
		).toEqual(true);
	});
});
