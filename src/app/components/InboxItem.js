import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import Card from 'react-md/lib/Cards/Card';

const InboxItem = () => (
  <div style={{ padding: "1em" }}>
    <Card>
      <DatePicker
        id="appointment"
        label="Select an appointment date"
        className="md-cell"
      />
      <DatePicker
        id="appointmentPortrait"
        label="Portrait Mode"
        displayMode="portrait"
        className="md-cell"
      />
      <DatePicker
        id="appointmentLandscape"
        label="Landscape Mode"
        displayMode="landscape"
        className="md-cell"
      />
    </Card>
  </div>
);

export default InboxItem;
