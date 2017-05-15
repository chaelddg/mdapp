import React, { PureComponent } from 'react';

class Login extends PureComponent {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default Login;
