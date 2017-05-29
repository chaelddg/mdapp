import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Card, CardText } from 'react-md/lib/Cards'
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';

import * as authActions from '../redux/actions/authActions';
import validateInput from '../validations/authentication';
import localdb from '../../helpers/localdb';

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

	componentWillMount() {
    localdb.clear();
  }

	componentWillReceiveProps(nextProps) {
		if (localdb.getItem('id')) {
			this.context.router.history.push('/dashboard');
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
			<div className="login_page">
				<div className="md-grid md-grid--center">
					<div className="md-cell md-cell--middle md-cell--3">
						<Card >
							<div className="login--logo">
								<span className="md-font-bold">
									MD
									<span className="cursive--font">app</span>
								</span>
							</div>
							<CardText>
								<h3>{!authMessage.success ? authMessage.message : ""}</h3>
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
										className=''
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
										className=''
									/>
									<SelectionControl
										id="remember"
										name="rememberMeCbox[]"
										label="Remember me"
										type="checkbox"
										value="mdSpec"
									/>

									<Button raised
										label='Login'
										onClick={this.handleLogin}
										children={<FontIcon>lock_open</FontIcon>}
										className="btn--gradient btn--large btn--center btn--capitalize"/>
								</div>
							</CardText>
						</Card>
					</div>
				</div>
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
