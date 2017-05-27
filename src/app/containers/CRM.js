import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import * as accountActions from '../redux/actions/accountActions';

import DataTable from '../components/DataTable';
import ToolBar from '../components/ToolBar';
import Dialog from '../components/Dialog';
import CRMForm from '../components/CRMForm';


class CRM extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      openDialog: false,
      page: 1,
      rowsPerPage: 10,
      search: '',
      sortState: {
        key: 'last_name',
        sort: 'asc',
        sortable: true
      }
    };

    this.searchThrottle = _.debounce(this.searchThrottle, 800);

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleColumnSort = this.handleColumnSort.bind(this);
    this.handleSearch     = this.handleSearch.bind(this);

    // Dialog Form Handlers
    this.handleFormChange     = this.handleFormChange.bind(this);

    this.closeDialogButton = <Button icon
                                     onClick={this.handleOpenDialog}
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
        handler: this.handleOpenDialog.bind(this),
        class: 'button-icon--success material-icons'
      }
    ];
  }

  componentWillMount() {
    this.props.actions.clearAccountList();
    this.props.actions.getAccountList(10, 0, '', 'asc', 'last_name');
  }

  componentWillUnmount() {
    this.searchThrottle.cancel(this, this.searchThrottle);
  }

  handleOpenDialog() {
    this.setState({
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

  handleFormChange(data, ctx, d) {
    console.log('@@ data', data, ctx);
  }

  searchThrottle(search) {
    const { sort, key } = this.state.sortState;
    this.props.actions.getAccountList(10, 0, search, sort, key);
  }

  render() {
    const { openDialog, page, rowsPerPage, search } = this.state;
    const { accounts, fetching, count } = this.props;
    const header = [
      { title: 'Last Name',    key: 'last_name',    sort: 'asc', sortable: true  },
      { title: 'First Name',   key: 'first_name',   sort: 'asc', sortable: true  },
      { title: 'Email',        key: 'email',        sort: 'asc', sortable: true  },
      { title: 'Gender',       key: 'sex',          sort: 'asc', sortable: true  },
      { title: 'Phone Number', key: 'phone_number',              sortable: false },
      {
        title: 'Actions',
        key: '',
        type: 'button',
        obj: this.tableActions,
        sortable: false
      }
    ];

    return (
      <div style={{ padding: "1em" }}>
        <ToolBar
          title={"MDapp / CRM"}
          handleOpenDialog={this.handleOpenDialog} />
        <br/>
        <DataTable
          tableId="accounts-table"
          hasActions={true}
          cardHeader={'Accounts'}
          header={header}
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
          dialogId="account-dialog"
          visible={openDialog}
          handleCloseDialog={this.handleOpenDialog}
        >
          <div>
            <Toolbar
              title="Create New Account"
              fixed
              colored
              actions={this.closeDialogButton}
            />
            <CRMForm
              handleFormChange={this.handleFormChange}
              index={1} />
          </div>

        </Dialog>
      </div>
    );
  }
}

CRM.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    fetching: state.ajaxCallsInProgress > 0,
    accounts: state.accounts.data ? state.accounts.data : [],
    count: state.accounts.count ? state.accounts.count : 0,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRM));
