import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as authActions from '../redux/actions/authActions';

class Inbox extends PureComponent {
  componentWillMount() {
		const credentials = {
			email: "d@gmail.com",
			password: "ReCode123"
		};

    this.props.actions.authenticateLogin(credentials);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

Inbox.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	console.log('@@ map state inbox', state);
  return {
		user: state.user
  };
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
