import React, { PureComponent } from 'react';
// import Dialog from 'react-md/lib/Dialogs';
// import Button from 'react-md/lib/Buttons/Button';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';

import randomImage from './randomImage';
// import LoremIpsum from './lorem';

// import RouterClass from './router';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from './Home';
import Settings from './Settings';

const inboxListItems = [{
  key: 'inbox',
  primaryText: 'Inbox',
  leftIcon: <FontIcon>inbox</FontIcon>,
  active: true,
}, {
  key: 'starred',
  primaryText: 'Starred',
  leftIcon: <FontIcon>star</FontIcon>,
}, {
  key: 'send-mail',
  primaryText: 'Send mail',
  leftIcon: <FontIcon>send</FontIcon>,
}, {
  key: 'drafts',
  primaryText: 'Drafts',
  leftIcon: <FontIcon>drafts</FontIcon>,
}, { key: 'divider', divider: true }, {
  key: 'all-mail',
  primaryText: 'All mail',
  leftIcon: <FontIcon>mail</FontIcon>,
}, {
  key: 'trash',
  primaryText: 'Trash',
  leftIcon: <FontIcon>delete</FontIcon>,
}, {
  key: 'spam',
  primaryText: 'Spam',
  leftIcon: <FontIcon>info</FontIcon>,
}];
const avatarSrc = randomImage();

const drawerHeaderChildren = [
  <Avatar
    key={avatarSrc}
    src={avatarSrc}
    role="presentation"
    iconSized
    style={{ alignSelf: 'center', marginLeft: 16, marginRight: 16, flexShrink: 0 }}
  />,
  <SelectField
    id="account-switcher"
    defaultValue="Jonathan"
    menuItems={['Jonathan', 'Fred']}
    key="account-switcher"
    position={SelectField.Positions.BELOW}
    className="md-select-field--toolbar"
  />,
];

export default class SimpleExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { visible: false, dialog: null, key: inboxListItems[0].key };
    this._setPage = this._setPage.bind(this);
    this._navItems = inboxListItems.map(item => {
      if (!item.divider) {
        item.onClick = () => this._setPage(item.key);
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

  _setPage(key) {
    this._navItems = this._navItems.map(item => {
      if (!item.divider) {
        item.active = item.key === key;
      }
      return item;
    });

    this.setState({ key });
  }

  render() {
    const { dialog } = this.state;

    const moreButton = (
      <MenuButton
        id="vert-menu"
        icon
        buttonChildren="more_vert"
        className="menu-example"
        tooltipLabel="Open some menu"
      >
        <ListItem primaryText="Settings" rightIcon={<FontIcon>settings</FontIcon>} />
        <ListItem primaryText="Logout" rightIcon={<FontIcon>power_settings_new</FontIcon>} />
      </MenuButton>
    );

    return (
      <Router>
        <div>
          <NavigationDrawer
            navItems={this._navItems}
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
            <div>
              <Route path='/home' component={Home} />
              <Route path='/settings' component={Settings} />
            </div>
          </NavigationDrawer>
        </div>
      </Router>
    );
  }
}