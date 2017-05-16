import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Card, CardText } from 'react-md/lib/Cards'
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';

import * as authActions from '../redux/actions/authActions';
import validateInput from '../validations/authentication';

class Login extends PureComponent {

	constructor (props) {
		super(props);
		this.state = {
			credentials: {
				email: "",
				password: ""
			},
			errors: {}
		};

		this.handleChangeFieldValue = this.handleChangeFieldValue.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { user } = nextProps;
		if (user && user.id) {
			this.context.router.history.push('/dashboard/inbox');
		}
	}

	handleChangeFieldValue(e, ctx) {
		const { credentials } = this.state;
		let temp = Object.assign({}, credentials);
		temp[ctx.target.id] = e;
		this.setState({ credentials: temp });
	}

	isValid() {
		const { isValid, errors } = validateInput(this.state.credentials);
		this.setState({ errors });
		return isValid
	}

	handleLogin() {
		if (this.isValid()) {
			this.props.actions.authenticateLogin(this.state.credentials);
		}
	}

	render() {
		const { credentials, errors } = this.state;
		const { authMessage } = this.props;

		return (
			<div>
				<Card className='md-cell md-cell--6'>
					<CardText>
						<h3>{authMessage}</h3>
						<div className='screenLogin__formWrap'>
							<TextField
								leftIcon={<FontIcon>person</FontIcon>}
								required
								id='email'
								label='Email'
								value={credentials.email}
								autoComplete={true}
								error={errors.email ? true : false}
								errorText={errors.email}
								onChange={this.handleChangeFieldValue}
								className='md-cell md-cell--12 md-cell--bottom'
							/>
							<TextField
								leftIcon={<FontIcon>lock</FontIcon>}
								required
								id='password'
								label='Password'
								value={credentials.password}
								error={errors.password ? true : false}
								errorText={errors.password}
								onChange={this.handleChangeFieldValue}
								type='password'
								className='md-cell md-cell--12 md-cell--bottom'
							/>

							<div className='md-cell md-cell--12'>
								<Button raised primary
												label='Login'
												onClick={this.handleLogin}
												children={<FontIcon>lock_open</FontIcon>}/>
							</div>
						</div>
					</CardText>
				</Card>
			</div>
		);
	}
}

Login.contextTypes = {
	router: PropTypes.object.isRequired
};

Login.propTypes = {
	user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		authMessage: state.authMessage,
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
