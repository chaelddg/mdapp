import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as authActions from '../redux/actions/authActions';

class Inbox extends PureComponent {
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
  return {
		user: state.user
  };
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inbox));
