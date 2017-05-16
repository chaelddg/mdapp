import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import Paper from 'react-md/lib/Papers';

import StarredIndex from './Starred';
import InboxItem from '../components/InboxItem';
import InboxInputs from '../components/InboxInputs';

import localdb from '../../helpers/localdb';

import * as authActions from '../redux/actions/authActions';

import randomImage from '../../helpers/randomImage';

const avatarSrc = randomImage();

class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { visible: false, dialog: null, key: 'inbox' };
		this._setPage = this._setPage.bind(this);
		this._navItems = this.props.navItems.map(item => {
			if (!item.divider) {
				item.onClick = () => this._setPage(item.key, item.href);
			}
			return item;
		});

	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.dialog && !prevState.dialog) {
			this._timeout = setTimeout(() => {
				this._timeout = null;

				this.state.dialog.querySelector('.md-btn').focus();
			}, 300);
		}
	}

	componentWillUnmount() {
		if (this._timeout) {
			clearTimeout(this._timeout);
		}
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

		const { dialog } = this.state;
		const { user, navItems } = this.props;
		const _navItems = navItems;

		let drawerHeaderChildren = [
			<Avatar
				key={avatarSrc}
				src={avatarSrc}
				role="presentation"
				iconSized
				style={{ alignSelf: 'center', marginLeft: 16, marginRight: 16, flexShrink: 0 }}
			/>,
			<SelectField
				id="account-switcher"
				defaultValue={user.first_name}
				menuItems={[user.first_name]}
				key="account-switcher"
				position={SelectField.Positions.BELOW}
				className="md-select-field--toolbar"
			/>,
		];

		const moreButton = (
			<MenuButton
				id="vert-menu"
				icon
				buttonChildren="more_vert"
				className="menu-example"
				tooltipLabel="Open some menu"
			>
				<ListItem primaryText="Settings" rightIcon={<FontIcon>settings</FontIcon>} />
				<ListItem primaryText="Logout" onClick={() => {
					localdb.clear();
					this.context.router.history.push('/login');
				}} rightIcon={<FontIcon>power_settings_new</FontIcon>} />
			</MenuButton>
		);

		return (
			<div>
				<NavigationDrawer
					navItems={_navItems}
					renderNode={dialog}
					contentClassName="md-grid"
					drawerHeaderChildren={drawerHeaderChildren}
					mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
					tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
					desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
					toolbarTitle="Material Design"
					toolbarActions={moreButton}
					toolbarProminentTitle
					contentId="main-content-demo"
				>
					<Paper
						zDepth={1}
						raiseOnHover={false}
						className='md-card md-cell md-cell--12'
						style={{ margin: '0px', width: '100%' }}>

						<div>
							<Route exact path={this.props.match.path} component={StarredIndex} />
							<Route path={`${this.props.match.path}/inbox`} component={InboxItem} />
							<Route path={`${this.props.match.path}/send-email`} component={InboxInputs} />
						</div>

					</Paper>
				</NavigationDrawer>
			</div>
		);
	}
}

Index.contextTypes = {
	router: PropTypes.object.isRequired
};

Index.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));