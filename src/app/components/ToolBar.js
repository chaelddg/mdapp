import React, { PureComponent } from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import Card from 'react-md/lib/Cards/Card';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button'

class ReactToolBar extends PureComponent {

  constructor (props) {
    super(props);

    this.actions = [
      <Button raised primary label="Create" onClick={this.props.handleOpenDialog}><FontIcon>add</FontIcon></Button>,
      <span>{' '}</span>,
      <Button raised secondary label="Edit"><FontIcon>border_color</FontIcon></Button>
    ];
  }

  render() {
    return (
      <Card>
        <Toolbar
          title="MDapp / Dashboard"
          actions={this.actions}
        />
      </Card>
    );
  }
}

export default ReactToolBar;
