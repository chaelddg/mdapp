import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FontIcon from 'react-md/lib/FontIcons';

import Login from './containers/Login';

import localdb from '../helpers/localdb';
import Index from './containers/Index';

import * as userActions from './redux/actions/userActions';

class App extends PureComponent {

	constructor (props) {
		super(props);

		this._setPage = this._setPage.bind(this);
		this.state = {
			_navItems: [],
      key: ""
		};
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

	componentWillUnmount() {
	  this.setState({
      _navItems: [],
      key: ""
    });
  }

	componentWillReceiveProps(nextProps) {
		let pathname = nextProps.location.pathname;
		if (nextProps.user && nextProps.user.menu) {
			// CHECKING IF USER IS NOT ALLOWED TO NAVIGATE ROUTE
			let foundObjForKey = nextProps.user.menu.find((item) => item.path === pathname);
			if (!foundObjForKey) {
				if (nextProps.user && nextProps.user.menu && nextProps.user.menu.length > 0)
					this.context.router.history.push(nextProps.user.menu[0].path);
			} else {
				let navItems = [];
				nextProps.user.menu.map((item, index) => {
					let _temp = Object.assign({});
					if (!item.divider) {
						_temp.active = (pathname === '/dashboard' && item.key === 'toys' ? item.active : (pathname.search(item.key) !== -1 ? true : false));
						_temp.key = item.key;
						_temp.primaryText = item.primaryText;
						_temp.leftIcon = <FontIcon>{item.icon}</FontIcon>;
						_temp.onClick = () => this._setPage(item.key, item.path);
					} else {
						_temp.divider = true;
						_temp.key = item.key;
					}
					return navItems.push(_temp);
				});
				this.setState({ _navItems: [...navItems] })
			}
		}
	}

	_setPage(key, href) {
		const { _navItems } = this.state;
		let navItems = _navItems.map(item => {
			if (!item.divider) {
				item.active = item.key === key ? true : false;
			}
			return item;
		});

		this.setState({ _navItems: [...navItems],  key }, () => {
      this.context.router.history.push(href);
    });
	}

	render() {
		const { _navItems } = this.state;
    if (!localdb.getItem('id')) {
      return <Login/>;
    }
		return (
			<Index navItems={_navItems} />
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
