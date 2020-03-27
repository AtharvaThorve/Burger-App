import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-orders';
import { updateObject, checkValidity } from '../../../shared/utility';

// const helperConfigFunction = (elType, type, placeholder, value) => {
// 	return {
// 		elementType: elType,
// 		elementConfig: {
// 			type: type,
// 			placeholder: placeholder
// 		},
// 		value: value,
// 		validation: {
// 			required: true
// 		},
// 		valid: false
// 	};
// };

class ContactData extends Component {
	state = {
		orderForm: {
			// Name is for reference the helper function does the same work as done below
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			pinCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Pin code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
					maxLength: 6
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			emailId: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: 'fastest',
				validation: {},
				valid: true
			}
		},
		formIsValid: false
	};

	orderHandler = event => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price, // On a real app you calculate price in the server and not here.
			orderData: formData,
			userId: this.props.userId
		};

		this.props.onOrderBurger(order, this.props.token);
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(
			this.state.orderForm[inputIdentifier],
			{
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.orderForm[inputIdentifier].validation
				),
				touched: true
			}
		);
		const updatedForm = updateObject(this.state.orderForm, {
			[inputIdentifier]: updatedFormElement
		});

		let formIsValid = true;
		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
	};

	render() {
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			// key in this are the names of the js object properties like name, street, zip, etc
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={event =>
							this.inputChangedHandler(event, formElement.id)
						}
					/>
				))}
				<Button btnType='Success' disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
