import React  from 'react';
import PropTypes from 'prop-types';

import Card from 'react-md/lib/Cards/Card';
import Divider from 'react-md/lib/Dividers';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

const TOWN = ['Abra', 'Aklan', 'Albay'];
const CIVIL_STATUS = ['Single', 'Married', 'Separated', 'Widowed'];
const RELIGION = ['Roman Catholic', 'Islam'];
const NATIONALITY = ['Afgan', 'Belgian'];
const SEX = ['Male', 'Female'];

const PersonalInformation = ({ index }) => (
  <Card className="override-dialog-patient-form-margin">

    <section className="md-grid" aria-labelledby={`new-row-group-${index + 1}`}>
      <h3 id={`new-row-group-${index + 1}`} className="md-cell md-cell--12">
        Fill Out Personal Information Form
      </h3>
      <TextField
        id={`patient-first-name-${index}`}
        name={`name-${index}`}
        label="First Name"
        placeholder="First Name"
        className="md-cell md-cell--4"
      />
      <TextField
        id={`patient-middle-name-${index}`}
        name={`name-${index}`}
        label="Middle Name"
        placeholder="Middle Name"
        className="md-cell md-cell--4"
      />
      <TextField
        id={`patient-last-name-${index}`}
        name={`name-${index}`}
        label="Last Name"
        placeholder="Last Name"
        className="md-cell md-cell--4"
      />


      <TextField
        id={`patient-house-number-${index}`}
        name={`name-${index}`}
        label="House St./No"
        placeholder="House St./No"
        className="md-cell md-cell--4"
      />
      <TextField
        id={`patient-barangay-${index}`}
        name={`name-${index}`}
        label="Barangay"
        placeholder="Barangay"
        className="md-cell md-cell--4"
      />
      <SelectField
        id={`patient-town-${index}`}
        name={`name-${index}`}
        label="Town/Province"
        menuItems={TOWN}
        itemLabel='name'
        itemValue='value'
        className="md-cell md-cell--4"
      />


      <TextField
        id={`patient-birthplace-${index}`}
        name={`name-${index}`}
        label="Birth Place"
        placeholder="Birth Place"
        className="md-cell md-cell--4"
      />
      <DatePicker
        id={`patient-date-${index}`}
        label="Landscape Mode"
        displayMode="landscape"
        className="md-cell md-cell--4"
      />
      <TextField
        id={`patient-age-${index}`}
        name={`name-${index}`}
        label="Age"
        placeholder="Age"
        className="md-cell md-cell--4"
      />


      <SelectField
        id={`patient-civilstatus-${index}`}
        name={`name-${index}`}
        label="Civil Status"
        menuItems={CIVIL_STATUS}
        itemLabel='name'
        itemValue='value'
        className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone"
      />
      <TextField
        id={`patient-occupation-${index}`}
        name={`name-${index}`}
        label="Occupation"
        placeholder="Occupation"
        className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone"
      />
      <SelectField
        id={`patient-religion-${index}`}
        name={`name-${index}`}
        label="Religion"
        menuItems={RELIGION}
        itemLabel='name'
        itemValue='value'
        className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone"
      />
      <SelectField
        id={`patient-nationality-${index}`}
        name={`name-${index}`}
        label="Nationality"
        menuItems={NATIONALITY}
        itemLabel='name'
        itemValue='value'
        className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone"
      />

      <SelectField
        id={`patient-sex-${index}`}
        name={`name-${index}`}
        label="Sex"
        menuItems={SEX}
        itemLabel='name'
        itemValue='value'
        className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone"
      />
      <TextField
        id={`patient-telno-${index}`}
        name={`name-${index}`}
        label="Tel No."
        placeholder="Tel No."
        className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone"
      />
      <TextField
        id={`patient-cellno-${index}`}
        name={`name-${index}`}
        label="Cell No."
        placeholder="Cell No."
        className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone"
      />
      <TextField
        id={`patient-email-${index}`}
        name={`name-${index}`}
        label="Email"
        placeholder="Email"
        className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone"
      />
    </section>

    <section className="md-grid">
      <Card className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">In Case of Emegency</h4>
        <TextField
          id={`patient-emergency-name-${index}`}
          name={`name-${index}`}
          label="Name"
          placeholder="Name"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-emergency-address-${index}`}
          name={`name-${index}`}
          label="Address"
          placeholder="Address"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-emergency-relation-${index}`}
          name={`name-${index}`}
          label="Relation"
          placeholder="Relation"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-emergency-telno-${index}`}
          name={`name-${index}`}
          label="Tel No./Cell No."
          placeholder="Tel No./Cell No."
          className="md-cell md-cell--12"
        />
      </Card>

      <Card className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Employer</h4>
        <TextField
          id={`patient-employer-name-${index}`}
          name={`name-${index}`}
          label="Name"
          placeholder="Name"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-employer-position-${index}`}
          name={`name-${index}`}
          label="Position"
          placeholder="Position"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-employer-address-${index}`}
          name={`name-${index}`}
          label="Address"
          placeholder="Address"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-employer-name-${index}`}
          name={`name-${index}`}
          label="Tel No./Cell No."
          placeholder="Tel No./Cell No."
          className="md-cell md-cell--12"
        />
      </Card>

      <Card className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Spouse</h4>
        <TextField
          id={`patient-spouse-name-${index}`}
          name={`name-${index}`}
          label="Name"
          placeholder="Name"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-spouse-employer-${index}`}
          name={`name-${index}`}
          label="Employer"
          placeholder="Employer"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-spouse-address-${index}`}
          name={`name-${index}`}
          label="Address"
          placeholder="Address"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-spouse-name-${index}`}
          name={`name-${index}`}
          label="Tel No./Cell No."
          placeholder="Tel No./Cell No."
          className="md-cell md-cell--12"
        />
      </Card>

      <Card className="md-cell md-cell--3 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Parent or Guardian (if minor)</h4>
        <TextField
          id={`patient-guardian-name-${index}`}
          name={`name-${index}`}
          label="Name"
          placeholder="Name"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-guardian-name-${index}`}
          name={`name-${index}`}
          label="Relation"
          placeholder="Relation"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-guardian-name-${index}`}
          name={`name-${index}`}
          label="Address"
          placeholder="Address"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-guardian-name-${index}`}
          name={`name-${index}`}
          label="Tel No./Cell No."
          placeholder="Tel No./Cell No."
          className="md-cell md-cell--12"
        />
      </Card>
    </section>

    <Divider className="md-cell md-cell--12" />

    <section className="md-cell md-cell--12">
      <Button raised
              primary
              label='Save'
              style={{marginBottom: "1em"}}
              children={<FontIcon>save</FontIcon>}/>
      <Button style={{marginBottom: "1em", marginLeft: "1em"}}
                raised
                secondary
                label='Cancel'
                children={<FontIcon>clear</FontIcon>}/>
    </section>
  </Card>
);

PersonalInformation.propTypes = {
  index: PropTypes.number.isRequired,
};

export default PersonalInformation;
