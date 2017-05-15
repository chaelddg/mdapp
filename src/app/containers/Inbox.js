import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TextField from 'react-md/lib/TextFields';

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
    console.log('@@ inbox');
    return (
      <div className="md-grid">
        <TextField
          id="floatingTitle"
          label="Title"
          placeholder="Hello World"
          customSize="title"
          size={10}
          className="md-cell md-cell--bottom"
        />
        <TextField
          id="floatingCenterTitle"
          label="Title"
          lineDirection="center"
          placeholder="Hello World"
          className="md-cell md-cell--bottom"
        />
        <TextField
          id="floatingMultiline"
          label="Type many letters"
          lineDirection="right"
          rows={2}
          placeholder="Hello World"
          className="md-cell md-cell--bottom"
        />
        <TextField
          id="floatingPassword"
          label="Enter your password"
          type="password"
          className="md-cell md-cell--bottom"
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
