import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import Snackbar from 'react-md/lib/Snackbars';

import DataTable from '../components/DataTable';
import ToolBar from '../components/ToolBar';
import Dialog from '../components/Dialog';
import CRMForm from '../components/CRMForm';

import * as accountActions from '../redux/actions/accountActions';
import validateInput from '../validations/account';

class CRM extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      toasts: [],
      openDialog: false,
      openDeleteDialog: false,
      page: 1,
      rowsPerPage: 10,
      search: '',
      sortState: {
        key: 'last_name',
        sort: 'asc',
        sortable: true
      },
      account: {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        phone_number: "",
        password2: "",
        account_role: "",
        account_status: ""
      },
      errors: {}
    };

    this.saveThrottle            = _.debounce(this.saveThrottle, 800);
    this.searchThrottle          = _.debounce(this.searchThrottle, 800);

    this.handleOpenDialog        = this.handleOpenDialog.bind(this);
    this.handleOpenDeleteDialog  = this.handleOpenDeleteDialog.bind(this);
    this.handleCloseDialog       = this.handleCloseDialog.bind(this);
    this.handlePagination        = this.handlePagination.bind(this);
    this.handleColumnSort        = this.handleColumnSort.bind(this);
    this.handleSearch            = this.handleSearch.bind(this);
    this.handleGridRequest       = this.handleGridRequest.bind(this);

    // Dialog Form Handlers
    this.handleFormChange        = this.handleFormChange.bind(this);
    this.handleSave              = this.handleSave.bind(this);

    // Toasts Handlers
    this.addToast                = this.addToast.bind(this);
    this.removeToast             = this.removeToast.bind(this);

    this.closeDialogButton = <Button icon
                                     onClick={this.handleCloseDialog}
                                     tooltipLabel="Close Dialog">close</Button>;

    this.tableActions = [
      {
        icon: 'edit',
        primary: true,
        text: 'Edit',
        class: 'button-icon--info material-icons',
        handler: this.handleOpenDialog.bind(this)
      },
      {
        icon: 'delete',
        text: 'Remove',
        handler: this.handleOpenDeleteDialog.bind(this),
        class: 'button-icon--success material-icons'
      }
    ];

    this.header = [
      { title: 'Last Name',    key: 'last_name',     sort: 'asc', sortable: true  },
      { title: 'First Name',   key: 'first_name',    sort: 'asc', sortable: true  },
      { title: 'Email',        key: 'email',         sort: 'asc', sortable: true  },
      { title: 'Role',         key: 'account_role',  sort: 'asc', sortable: false  },
      { title: 'Status',       key: 'account_status',sort: 'asc', sortable: false  },
      { title: 'Phone Number', key: 'phone_number',              sortable: false },
      {
        title: 'Actions',
        key: '',
        type: 'button',
        obj: this.tableActions,
        sortable: false
      }
    ];
  }

  componentWillMount() {
    this.handleGridRequest();
  }

  componentWillUnmount() {
    this.saveThrottle.cancel(this, this.saveThrottle);
    this.searchThrottle.cancel(this, this.searchThrottle);
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;

    if (message && message.success) {
      this.handleCloseDialog();
      this.addToast(message.message);
      this.handleGridRequest();
    }
  }

  handleGridRequest() {
    this.props.actions.clearAccountList();
    this.props.actions.getAccountList(10, 0, '', 'asc', 'last_name');
  }

  addToast(message) {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: message });
    this.setState({ toasts });
  }

  removeToast() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  saveThrottle() {
    let newState = Object.assign({}, this.state.account);
    delete newState.password2;
    this.props.actions.createUserAccount(newState);
  }

  isValid() {
    const { isValid, errors } = validateInput(this.state.account);
    this.setState({ errors });
    return isValid
  }

  handleOpenDialog() {
    this.props.actions.clearCreateAccountMessage();
    this.setState({
      openDialog: !this.state.openDialog
    });
  }

  handleOpenDeleteDialog() {
    this.setState({
      openDeleteDialog: !this.state.openDeleteDialog
    });
  }

  handleCloseDialog() {
    this.setState({
      account: {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        phone_number: "",
        password2: "",
        account_role: "",
        account_status: ""
      },
      errors: {},
      openDialog: !this.state.openDialog
    });
  }

  handlePagination(newStart, rowsPerPage, currentPage) {
    const { key, sort } = this.state.sortState;
    let search = this.state.search;
    let limit = (newStart + rowsPerPage);

    this.props.actions.getAccountList(limit, newStart, search, sort, key);
    this.setState({
      page: currentPage,
      rowsPerPage
    });
  }

  handleColumnSort(sortData) {
    let { sortState, search } = this.state;
    const { key, sortable, sort } = sortData;
    if (sortable) {
      // IF STATE COL KEY IS EQ TO CLICK COL KEY CHANGE SORT KEY
      if (sortState['key'] === key) {
        sortState['sort'] = sortState['sort'] === 'asc' ? 'desc' : 'asc';
        this.props.actions.getAccountList(10, 0, search, sortState['sort'], key);
        this.setState({sortState: sortState, page: 1, rowsPerPage: 10});
      } else {
        this.props.actions.getAccountList(10, 0, search, sort, key);
        this.setState({sortState: sortData, page: 1, rowsPerPage: 10});
      }
    }
  }

  handleSearch(search) {
    this.setState({search}, () => {
      this.searchThrottle(search);
    });
  }

  handleFormChange(key, value) {
    let data = Object.assign({}, this.state.account);
    data[key] = value;
    this.setState({ account: data });
  }

  handleSave() {
    if (this.isValid()) {
      this.saveThrottle();
    }
  }

  searchThrottle(search) {
    const { sort, key } = this.state.sortState;
    this.props.actions.getAccountList(10, 0, search, sort, key);
  }

  render() {
    const { openDialog, openDeleteDialog, page, rowsPerPage, search, account, errors, toasts } = this.state;
    const { accounts, fetching, count, message } = this.props;

    return (
      <div style={{ padding: "1em" }}>
        <Snackbar
          toasts={toasts}
          autohideTimeout={3000}
          onDismiss={this.removeToast}
        />
        <ToolBar
          title={"MDapp / CRM"}
          handleOpenDialog={this.handleOpenDialog} />
        <br/>
        <DataTable
          tableId="accounts-table"
          hasActions={true}
          cardHeader={'Accounts'}
          header={this.header}
          data={accounts}
          search={search}
          isFetching={fetching}
          page={page}
          rowsPerPage={rowsPerPage}
          handlePagination={this.handlePagination}
          handleColumnSort={this.handleColumnSort}
          handleSearch={this.handleSearch}
          count={count}
        />
        <Dialog
          dialogId="account-delete-dialog"
          fullPage={false}
          visible={openDeleteDialog}
          onHide={this.handleOpenDeleteDialog}
          actions={[{
            onClick: this.handleOpenDeleteDialog,
            primary: true,
            label: 'Turn on speed boost',
          }, {
            onClick: this.handleOpenDeleteDialog,
            primary: true,
            label: 'No thanks',
          }]}
        >
          <p id="speedBoostDescription" className="md-color--secondary-text">
            Let Google help apps determine location. This means sending anonymouse
            location data to Google, even when no apps are running.
          </p>
        </Dialog>
        <Dialog
          dialogId="account-dialog"
          fullPage={true}
          visible={openDialog}
          handleCloseDialog={this.handleCloseDialog}
        >
          <div>
            <Toolbar
              title="Create New Account"
              fixed
              colored
              actions={this.closeDialogButton}
            />
            <CRMForm
              data={account}
              errors={errors}
              fetching={fetching}
              message={message}
              handleSave={this.handleSave}
              handleCancel={this.handleCloseDialog}
              handleFormChange={this.handleFormChange}
              index={1} />
          </div>

        </Dialog>
      </div>
    );
  }
}

CRM.contextTypes = {
  router: PropTypes.object.isRequired
};

CRM.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    fetching: state.ajaxCallsInProgress > 0,
    accounts: state.accounts.data ? state.accounts.data : [],
    count: state.accounts.count ? state.accounts.count : 0,
    message: state.accounts.message,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRM));
