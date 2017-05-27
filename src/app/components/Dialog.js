import React  from 'react';
import Dialog from 'react-md/lib/Dialogs';

const ReactDialog = ({ dialogId, visible, handleCloseDialog, children }) => {
  return (
    <Dialog
      id={dialogId}
      aria-label="Create a new row"
      visible={visible}
      modal={true}
      onHide={handleCloseDialog}
      fullPage
    >
      {children}
    </Dialog>
  );
};

export default ReactDialog;
