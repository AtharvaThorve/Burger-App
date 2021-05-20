import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary/Auxillary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		// Good place to retireve data from server
		this.props.onInitIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		// console.log("sum:", sum)
		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.props.error ? (
			<p style={{ textAlign: 'center' }}>Ingredients cannot be loaded</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						isAuth={this.props.isAuthenticated}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						price={this.props.price}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					price={this.props.price}
					ingredients={this.props.ings}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: ingName =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path =>
			dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
