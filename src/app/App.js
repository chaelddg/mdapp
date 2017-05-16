import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FontIcon from 'react-md/lib/FontIcons';

import localdb from '../helpers/localdb';
import Index from './containers/Index';

import * as userActions from './redux/actions/userActions';

class App extends PureComponent {

	constructor (props) {
		super(props);

		this._setPage = this._setPage.bind(this);
	}

	componentWillMount() {
		const { user } = this.props;

		if (!user.id) {
			let id = localdb.getItem('id');

			if (id) {
				this.props.actions.getUserDetails(id);
			} else {
				this.context.router.history.push('/login');
			}
		} else {
			let pathname = this.props.location.pathname;
			this.context.router.history.push(pathname);
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log('@@ nextprops appjs =>', nextProps);
	}

	_setPage(key, href) {
		this._navItems = this._navItems.map(item => {
			if (!item.divider) {
				item.active = item.key === key;
			}
			return item;
		});

		this.setState({ key });
		this.context.router.history.push(href)
	}

	render() {
		const { user } = this.props;
		let navItems = [];
		if (user.menu) {
			user.menu.map((item, index) => {
				console.log('@@ primaryText', item);
				let _temp = {};
				if (!item.divider) {
					_temp.primaryText = item.primaryText;
					_temp.href = item.path;
					_temp.leftIcon = <FontIcon>{item.icon}</FontIcon>;
					_temp.onClick = () => this._setPage(item.key, item.href);
				} else {
					_temp.divider = true;
					_temp.key = item.key;
				}
				navItems.push(_temp);
			});
		}
		return (
			<Index navItems={navItems} />
		);
	}
}

App.contextTypes = {
	router: PropTypes.object.isRequired
};

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
		actions: bindActionCreators(userActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
