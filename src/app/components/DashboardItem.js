import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import DataTable from './DataTable';
import ToolBar from './ToolBar';
import Dialog from './Dialog';


class DashboardItem extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      openDialog: false
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.closeDialogButton = <Button icon onClick={this.handleOpenDialog} tooltipLabel="Close Dialog">close</Button>;
  }

  handleOpenDialog() {
    this.setState({
      openDialog: !this.state.openDialog
    })
  }

  render() {
    const { openDialog } = this.state;

    return (
      <div style={{ padding: "1em" }}>
        <ToolBar handleOpenDialog={this.handleOpenDialog} />
        <br/>
        <DataTable/>
        <Dialog
          visible={openDialog}
          handleCloseDialog={this.handleOpenDialog}
        >
          <Toolbar
            title="Create new row"
            fixed
            colored
            actions={this.closeDialogButton}
          />
        </Dialog>
      </div>
    );
  }
}

export default DashboardItem;
