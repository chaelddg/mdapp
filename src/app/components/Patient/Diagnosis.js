import React  from 'react';
import PropTypes from 'prop-types';

import { Editor } from 'react-draft-wysiwyg';
import Card from 'react-md/lib/Cards/Card';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Diagnosis = ({ index, inlineValue }) => (
  <Card className="override-dialog-patient-form-margin">
    <section className="md-grid">
      <h3 id={`new-row-group-${index + 1}`} className="md-cell md-cell--12">
        Results
      </h3>
    </section>

    <section className="md-grid">
      <Card className="md-cell md-cell--12 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Diagnosis</h4>
        <Editor />
      </Card>
    </section>

    <section className="md-grid">
      <Card className="md-cell md-cell--12 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Treatment</h4>
        <Editor />
      </Card>
    </section>

    <section className="md-grid">
      <Card className="md-cell md-cell--6 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Allergies</h4>
        
        <TextField
          id={`patient-allergy-${index}`}
          name={`name-${index}`}
          label="Allergy"
          placeholder="Allergy"
          className="md-cell md-cell--12"
        />
      </Card>

      <Card className="md-cell md-cell--6 md-cell--4-tablet md-cell--4-phone">
        <h4 className="md-cell md-cell--12">Medications</h4>
        
        <TextField
          id={`patient-medication-${index}`}
          name={`name-${index}`}
          label="Medication"
          placeholder="Medication"
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

Diagnosis.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Diagnosis;
