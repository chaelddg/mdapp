import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends PureComponent {

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: null
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
