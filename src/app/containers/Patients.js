import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import * as patientActions from '../redux/actions/patientActions';

import DataTable from '../components/DataTable';
import ToolBar from '../components/ToolBar';
import Dialog from '../components/Dialog';
import PatientForm from '../components/PatientForm';


class Dashboard extends PureComponent {
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

    this.searchDebouce    = _.debounce(this.searchDebouce, 800);

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleColumnSort = this.handleColumnSort.bind(this);
    this.handleSearch     = this.handleSearch.bind(this);

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
    this.props.actions.clearPatientList();
    this.props.actions.getPatientList(10, 0, '', 'asc', 'last_name');
  }

  componentWillUnmount() {
    this.searchDebouce.cancel(this, this.searchDebouce);
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

    this.props.actions.getPatientList(limit, newStart, search, sort, key);
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
        this.props.actions.getPatientList(10, 0, search, sortState['sort'], key);
        this.setState({sortState: sortState, page: 1, rowsPerPage: 10});
      } else {
        this.props.actions.getPatientList(10, 0, search, sort, key);
        this.setState({sortState: sortData, page: 1, rowsPerPage: 10});
      }
    }
  }

  handleSearch(search) {
    this.setState({search}, () => {
      this.searchDebouce(search);
    });
  }

  searchDebouce(search) {
    const { sort, key } = this.state.sortState;
    this.props.actions.getPatientList(10, 0, search, sort, key);
  }

  render() {
    const { openDialog, page, rowsPerPage, search } = this.state;
    const { patients, fetching, count } = this.props;
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
          title={"MDapp / Patients"}
          handleOpenDialog={this.handleOpenDialog} />
        <br/>
        <DataTable
          tableId="patients-table"
          hasActions={true}
          cardHeader={'Patients'}
          header={header}
          data={patients}
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
          dialogId="patients-dialog"
          fullPage={true}
          visible={openDialog}
          handleCloseDialog={this.handleOpenDialog}
        >
          <div>
            <Toolbar
              title="Create New Patient"
              fixed
              colored
              actions={this.closeDialogButton}
            />
            <PatientForm index={1} />
          </div>

        </Dialog>
      </div>
    );
  }
}

Dashboard.propTypes = {
	user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
	  fetching: state.ajaxCallsInProgress > 0,
	  patients: state.patients.data ? state.patients.data : [],
    count: state.patients.count ? state.patients.count : 0,
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(patientActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
