import React  from 'react';
import PropTypes from 'prop-types';
import Card from 'react-md/lib/Cards/Card';
import Divider from 'react-md/lib/Dividers';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';

const TYPES = [
  { name: 'Doctor', value: 'doctor' },
  { name: 'Nurse', value: 'nurse' },
  { name: 'Receptionist', value: 'receptionist' },
  { name: 'Laboratory', value: 'laboratory' }
];

const STATUS = [
  { name: 'Active', value: 'active' },
  { name: 'In-active', value: 'in_active' }
];

const CRMForm = ({ index, handleFormChange }) => (
  <Card className="override-dialog-form-margin">
    <section className="md-grid" aria-labelledby={`new-row-group-${index + 1}`}>
      <h3 id={`new-row-group-${index + 1}`} className="md-cell md-cell--12">Fill Out Account Form</h3>
      <TextField
        id={`account-first-name-${index}`}
        name={`name-${index}`}
        label="First Name"
        defaultValue="Magic"
        placeholder="Ice Cream"
        onChange={handleFormChange}
        className="md-cell md-cell--4"
      />
      <TextField
        id={`account-last-name-${index}`}
        name={`name-${index}`}
        label="Last Name"
        defaultValue="Roger"
        placeholder="Ice Cream"
        className="md-cell md-cell--4"
      />
      <TextField
        id={`account-email-${index}`}
        name={`name-${index}`}
        label="Email"
        defaultValue="test@gmail.com"
        placeholder="Ice Cream"
        className="md-cell md-cell--4"
      />
      <TextField
        id={`account-phone-number-${index}`}
        name={`name-${index}`}
        label="Phone Number"
        defaultValue="0947263621"
        placeholder="Phone Number"
        className="md-cell md-cell--4"
      />
      <SelectField
        id={'account-type'}
        name={'account-type'}
        label="Role"
        menuItems={TYPES}
        itemLabel='name'
        itemValue='name'
        onChange={handleFormChange}
        className="md-cell md-cell--4"
      />
      <SelectField
        id={'account-status'}
        name={'account-status'}
        label="Account Status"
        menuItems={STATUS}
        itemLabel='name'
        itemValue='name'
        onChange={handleFormChange}
        className="md-cell md-cell--4"
      />
      <TextField
        id={`account-password-${index}`}
        name={`fat-${index}`}
        type="password"
        label='Password'
        defaultValue={3}
        placeholder="3"
        className="md-cell md-cell--4"
      />
      <TextField
        id={`account-re-password-${index}`}
        name={`fat-${index}`}
        type="password"
        label='Password'
        defaultValue={3}
        placeholder="3"
        className="md-cell md-cell--4"
      />
      <div className="md-cell md-cell--4"></div>
      <div className="md-cell md-cell--12">
        <Divider />
      </div>
      <div className="md-cell md-cell--4">
        <Button raised
                primary
                label='Save'
                children={<FontIcon>save</FontIcon>}/>
        {' '}
        <Button style={{marginLeft: '10px'}}
                raised
                secondary
                label='Cancel'
                children={<FontIcon>clear</FontIcon>}/>
      </div>
      <div className="md-cell md-cell--4"></div>
      <div className="md-cell md-cell--4"></div>
    </section>
  </Card>
);

CRMForm.propTypes = {
  index: PropTypes.number.isRequired,
};

export default CRMForm;
