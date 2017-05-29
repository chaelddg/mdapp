import React  from 'react';
import PropTypes from 'prop-types';
import Card from 'react-md/lib/Cards/Card';
import Divider from 'react-md/lib/Dividers';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';

const ROLES = [
  { name: 'Doctor', value: 'doctor' },
  { name: 'Nurse', value: 'nurse' },
  { name: 'Receptionist', value: 'receptionist' },
  { name: 'Laboratory', value: 'laboratory' }
];

const STATUS = [
  { name: 'Active', value: 'active' },
  { name: 'In-active', value: 'in_active' }
];

const CRMForm = (
  {
    data,
    index,
    handleFormChange,
    errors,
    fetching,
    handleSave,
    message,
    handleCancel
  }) => (
  <Card className="override-dialog-form-margin">
    <section className="md-grid" aria-labelledby={`new-row-group-${index + 1}`}>
      <h3 id={`new-row-group-${index + 1}`} className="md-cell md-cell--12">
        Fill Out Account Form
      </h3>
      <TextField
        id={`account-first-name-${index}`}
        name={`name-${index}`}
        label="First Name"
        value={data.first_name}
        placeholder="First Name"
        onChange={handleFormChange.bind(this, 'first_name')}
        error={errors.first_name ? true : false}
        errorText={errors.first_name}
        className="md-cell md-cell--4"
      />
      <TextField
        id={`account-last-name-${index}`}
        name={`name-${index}`}
        label="Last Name"
        value={data.last_name}
        placeholder="Last Name"
        onChange={handleFormChange.bind(this, 'last_name')}
        error={errors.last_name ? true : false}
        errorText={errors.last_name}
        className="md-cell md-cell--4"
      />
      <TextField
        id={`email-${index}`}
        name={`name-${index}`}
        label="Email"
        value={data.email}
        placeholder="Email"
        onChange={handleFormChange.bind(this, 'email')}
        error={errors.email ? true : false}
        errorText={errors.email}
        className="md-cell md-cell--4"
      />
      <TextField
        id={`phone-${index}`}
        name={`phone-${index}`}
        label="Phone Number"
        value={data.phone_number}
        placeholder="Phone Number"
        onChange={handleFormChange.bind(this, 'phone_number')}
        error={errors.phone_number ? true : false}
        errorText={errors.phone_number}
        className="md-cell md-cell--4"
      />
      <SelectField
        id={'account-role'}
        name={'account-role'}
        label="Role"
        menuItems={ROLES}
        itemLabel='name'
        itemValue='value'
        value={data.account_role}
        onChange={handleFormChange.bind(this, 'account_role')}
        error={errors.account_role ? true : false}
        errorText={errors.account_role}
        className="md-cell md-cell--4"
      />
      <SelectField
        id={'account-status'}
        name={'account-status'}
        label="Account Status"
        menuItems={STATUS}
        itemLabel='name'
        itemValue='value'
        value={data.account_status}
        onChange={handleFormChange.bind(this, 'account_status')}
        error={errors.account_status ? true : false}
        errorText={errors.account_status}
        className="md-cell md-cell--4"
      />
      <TextField
        id={`account-password-${index}`}
        name={`account-password-${index}`}
        type="password"
        label='Password'
        value={data.password}
        placeholder="**********"
        onChange={handleFormChange.bind(this, 'password')}
        error={errors.password ? true : false}
        errorText={errors.password}
        className="md-cell md-cell--4"
      />
      <TextField
        id={`account-password-2-${index}`}
        name={`account-password-2-${index}`}
        type="password"
        label='Confirm Password'
        value={data.password2}
        placeholder="**********"
        onChange={handleFormChange.bind(this, 'password2')}
        error={errors.password2 ? true : false}
        errorText={errors.password2}
        className="md-cell md-cell--4"
      />
      <div className="md-cell md-cell--4"></div>
      <div className="md-cell md-cell--12">
        <Divider />
      </div>
      <div className="md-cell md-cell--4">
        {
          fetching ?
            <Button raised
                    primary
                    disabled
                    label='Saving ...'
                    onClick={handleSave}
                    children={<FontIcon>save</FontIcon>}/>
            :
            <Button raised
                    primary
                    label='Save'
                    onClick={handleSave}
                    children={<FontIcon>save</FontIcon>}/>
        }

        {' '}
        <Button style={{marginLeft: '10px'}}
                raised
                secondary
                label='Cancel'
                onClick={handleCancel}
                children={<FontIcon>clear</FontIcon>}/>
      </div>
      <div className="md-cell md-cell--4">
        <h4 style={{textAlign: "center", color: "#F44336"}}>{!message.success ? message.message : ""}</h4>
      </div>
      <div className="md-cell md-cell--4"></div>
    </section>
  </Card>
);

CRMForm.propTypes = {
  index: PropTypes.number.isRequired,
};

export default CRMForm;
