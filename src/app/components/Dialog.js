import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';

class ReactDialog extends PureComponent {

  constructor (props) {
    super(props);

    this.state = {
      count: 0
    };

    this.closeDialog = this.closeDialog.bind(this);
  }

  closeDialog() {
    this.props.handleCloseDialog();
  }

  render() {

    const { visible } = this.props;

    return (
      <Dialog
        id="add-row-dialog"
        aria-label="Create a new row"
        visible={visible}
        onHide={this.closeDialog}
        fullPage
      >
        {this.props.children}
      </Dialog>
    );
  }
}

export default ReactDialog;
