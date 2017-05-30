import React  from 'react';
import Dialog from 'react-md/lib/Dialogs';

const ReactDialog =
  ({
   dialogId,
   visible,
   handleCloseDialog,
   children,
   fullPage,
   actions,
   dialogTitle
}) => {
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
            dialogStyle={{ width: "30%" }}
            title={dialogTitle}
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
