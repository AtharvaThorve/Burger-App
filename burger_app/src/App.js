import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Layout from './hoc/Layout/Layout';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignUp();
	}

	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path='/checkout' component={Checkout} />
						<Route path='/orders' component={Orders} />
						<Route path='/auth' component={Auth} />
						<Route path='/logout' component={Logout} />
						<Route path='/' exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(null, mapDispatchToProps)(App));
