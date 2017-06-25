import React  from 'react';
import PropTypes from 'prop-types';

import Card from 'react-md/lib/Cards/Card';
import Divider from 'react-md/lib/Dividers';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import Radio from 'react-md/lib/SelectionControls/Radio';

const TOWN = ['Abra', 'Aklan', 'Albay'];

const PatientInformation = ({ index, inlineValue }) => (
  <Card className="override-dialog-patient-form-margin">
    <section className="md-grid">
      <h3 id={`new-row-group-${index + 1}`} className="md-cell md-cell--12">
        Fill Out Patient Information Form
      </h3>
    </section>

    <section className="md-grid">
      <Card className="md-cell md-cell--6 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Responsible for the Patients Account</h4>
        <TextField
          id={`patient-resp-name-${index}`}
          name={`name-${index}`}
          label="Name"
          placeholder="Name"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-resp-address-${index}`}
          name={`name-${index}`}
          label="Address"
          placeholder="Address"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-resp-employer-${index}`}
          name={`name-${index}`}
          label="Employer"
          placeholder="Employer"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-resp-position-${index}`}
          name={`name-${index}`}
          label="Position"
          placeholder="Position"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-resp-relation-${index}`}
          name={`name-${index}`}
          label="Relation"
          placeholder="Relation"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-resp-telno-${index}`}
          name={`name-${index}`}
          label="Tel No./Cell No."
          placeholder="Tel No./Cell No."
          className="md-cell md-cell--12"
        />
      </Card>

      <Card className="md-cell md-cell--6 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Patient Information</h4>
        <SelectField
          id={`patient-info-${index}`}
          name={`name-${index}`}
          label="Service"
          menuItems={TOWN}
          itemLabel='name'
          itemValue='value'
          className="md-cell md-cell--12"
        />
        <h4 className="md-cell md-cell--12">Patient Plan</h4>
        <Radio
            id="inlineRadio1"
            inline
            name="inlineRadios"
            value="A"
            label="Self Pay"
            checked={inlineValue === 'A'}
          />
          <Radio
            id="inlineRadio2"
            inline
            name="inlineRadios"
            value="B"
            label="Company"
            checked={inlineValue === 'B'}
          />
          <Radio
            id="inlineRadio3"
            inline
            name="inlineRadios"
            value="C"
            label="Insurance/HMO"
            checked={inlineValue === 'C'}
          />
          <TextField
            id={`patient-info-gsis-${index}`}
            name={`name-${index}`}
            label="Account 1"
            placeholder="Account 1"
            className="md-cell md-cell--12"
          />
          <TextField
            id={`patient-info-sss-${index}`}
            name={`name-${index}`}
            label="Account 2"
            placeholder="Account 2"
            className="md-cell md-cell--12"
          />
          <TextField
            id={`patient-info-insurance-${index}`}
            name={`name-${index}`}
            label="Remarks"
            placeholder="Remarks"
            className="md-cell md-cell--12"
          />
      </Card>

      <Card className="md-cell md-cell--6 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Doctors</h4>
        <SelectField
          id={`patient-doctor-1-${index}`}
          name={`name-${index}`}
          label="Attending 1"
          menuItems={TOWN}
          itemLabel='name'
          itemValue='value'
          className="md-cell md-cell--12"
        />
        <SelectField
          id={`patient-doctor-2-${index}`}
          name={`name-${index}`}
          label="Attending 2"
          menuItems={TOWN}
          itemLabel='name'
          itemValue='value'
          className="md-cell md-cell--12"
        />
        <SelectField
          id={`patient-doctor-3-${index}`}
          name={`name-${index}`}
          label="Attending 3"
          menuItems={TOWN}
          itemLabel='name'
          itemValue='value'
          className="md-cell md-cell--12"
        />
      </Card>

      <Card className="md-cell md-cell--6 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Medicare/PhilHealth/SSS</h4>
        <TextField
          id={`patient-med-phic-${index}`}
          name={`name-${index}`}
          label="PHIC Number"
          placeholder="PHIC Number"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-med-gsis-${index}`}
          name={`name-${index}`}
          label="GSIS Number"
          placeholder="GSIS Number"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-med-sss-${index}`}
          name={`name-${index}`}
          label="SSS Number"
          placeholder="SSS Number"
          className="md-cell md-cell--12"
        />
        <TextField
          id={`patient-med-insurance-${index}`}
          name={`name-${index}`}
          label="Insurance / HMO"
          placeholder="Insurance / HMO"
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

PatientInformation.propTypes = {
  index: PropTypes.number.isRequired,
};

export default PatientInformation;
