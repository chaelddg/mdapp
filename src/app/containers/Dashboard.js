import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as patientActions from '../redux/actions/patientActions';

import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import DataTable from '../components/DataTable';
import ToolBar from '../components/ToolBar';
import Dialog from '../components/Dialog';
import FormGroup from '../components/FormGroup';


class Dashboard extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      openDialog: false,
      page: 1,
      rowsPerPage: 10
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handlePagination = this.handlePagination.bind(this);

    this.closeDialogButton = <Button icon
                                     onClick={this.handleOpenDialog}
                                     tooltipLabel="Close Dialog">close</Button>;
  }

  componentWillMount() {
    this.props.actions.clearPatientList();
    this.props.actions.getPatientList(10, 0, '', '');
  }

  handleOpenDialog() {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  handlePagination(newStart, rowsPerPage, search, sort, currentPage) {
    let limit = (newStart + rowsPerPage);

    this.props.actions.getPatientList(limit, newStart, search, sort);
    this.setState({
      page: currentPage,
      rowsPerPage
    })
  }

  render() {
    const { openDialog, page, rowsPerPage } = this.state;
    const { patients, fetching, count } = this.props;

    const header = [
      { title: 'Last Name',    key: 'last_name'    },
      { title: 'First Name',   key: 'first_name'   },
      { title: 'Email',        key: 'email'        },
      { title: 'Gender',       key: 'sex'          },
      { title: 'Phone Number', key: 'phone_number' }
    ];

    return (
      <div style={{ padding: "1em" }}>
        <ToolBar handleOpenDialog={this.handleOpenDialog} />
        <br/>
        <DataTable
          tableId="dashboard-table"
          header={header}
          data={patients}
          isFetching={fetching}
          page={page}
          rowsPerPage={rowsPerPage}
          handlePagination={this.handlePagination}
          count={count}
        />
        <Dialog
          visible={openDialog}
          handleCloseDialog={this.handleOpenDialog}
        >
          <div>
            <Toolbar
              title="Create new row"
              fixed
              colored
              actions={this.closeDialogButton}
            />
            <FormGroup index={1} />
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
