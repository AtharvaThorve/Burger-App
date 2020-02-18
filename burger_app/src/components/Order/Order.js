import React from 'react';

import classes from './Order.css';

const order = props => {
	// let transformedIngredients = Object.keys(props.ingredients)
	// 	.map(igKey => {
	// 		return [...Array(props.ingredients[igKey])].map((_, i) => {
	// 			return <BurgerIngredient key={igKey + i} type={igKey} />;
	// 		});
	// 	})
	// 	.reduce((arr, el) => {
	// 		return arr.concat(el);
	// 	}, []);
	// Can be done this way
	// alternative way is
	const ingredients = [];
	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}

	const ingredientOutput = ingredients.map(ig => {
		return (
			<span
				key={ig.name}
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0px 8px',
					border: '1px solid #ccc',
					padding: '5px'
				}}
			>
				{ig.name} ({ig.amount})
			</span>
		);
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price:{' '}
				<strong>${Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
