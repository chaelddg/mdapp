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
      openDialog: false
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.closeDialogButton = <Button icon onClick={this.handleOpenDialog} tooltipLabel="Close Dialog">close</Button>;
  }

  componentWillMount() {
    this.props.actions.clearPatientList();
    this.props.actions.getPatientList();
  }

  handleOpenDialog() {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  render() {
    const { openDialog } = this.state;
    const { patients } = this.props;

    const header = [
      {
        title: 'First Name'
      },
      {
        title: 'Last Name'
      },
      {
        title: 'Email'
      },
      {
        title: 'Gender'
      },
      {
        title: 'Phone Number'
      }
    ];

    return (
      <div style={{ padding: "1em" }}>
        <ToolBar handleOpenDialog={this.handleOpenDialog} />
        <br/>
        <DataTable
          tableId="dashboard-table"
          header={header}
          data={patients}
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
	  patients: state.patients,
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(patientActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
