import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Card, CardText } from 'react-md/lib/Cards'
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';

import * as authActions from '../redux/actions/authActions';

class Login extends PureComponent {

	constructor (props) {
		super(props);
		this.state = {
			credentials: {
				email: "",
				password: ""
			}
		};

		this.handleChangeFieldValue = this.handleChangeFieldValue.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChangeFieldValue(e, ctx) {
		const { credentials } = this.state;
		let temp = Object.assign({}, credentials);
		temp[ctx.target.id] = e;
		this.setState({ credentials: temp });
	}

	handleLogin() {
		console.log('@@ handleLogin state', this.state.credentials);
	}

	render() {
		const { credentials } = this.state;

		return (
			<div>
				<Card className='md-cell md-cell--6'>
					<CardText>
						<div className='screenLogin__formWrap'>
							<TextField
								leftIcon={<FontIcon>person</FontIcon>}
								required
								id='email'
								label='Email'
								value={credentials.email}
								autoComplete={true}
								onChange={this.handleChangeFieldValue}
								className='md-cell md-cell--12 md-cell--bottom'
							/>
							<TextField
								leftIcon={<FontIcon>lock</FontIcon>}
								required
								id='password'
								label='Password'
								value={credentials.password}
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

Login.propTypes = {
	user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
