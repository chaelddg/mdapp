import React  from 'react';
import Dialog from 'react-md/lib/Dialogs';

const ReactDialog = ({ dialogId, visible, handleCloseDialog, children, fullPage, actions }) => {
  return (
    <div>
      {
        fullPage ?
          <Dialog
            id={dialogId}
            visible={visible}
            aria-label={dialogId}
            modal={true}
            onHide={handleCloseDialog}
            fullPage
          >
            {children}
          </Dialog>
          :
          <Dialog
            id={dialogId}
            title={dialogId}
            visible={visible}
            modal={true}
            actions={actions}
            onHide={handleCloseDialog}
          >
            {children}
          </Dialog>
      }
    </div>
  );
};

export default ReactDialog;
