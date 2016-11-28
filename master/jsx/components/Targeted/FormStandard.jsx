import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {ControlLabel, Grid, Row, Col, Panel, Button, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';

class FormStandard extends React.Component {


  constructor(props) {
    super(props)
    this.state = {value:''}
    this.getValidationState = this.getValidationState.bind(this)
  }

    getValidationState() {
      const length = this.state.value.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
    }

    handleChange(e) {
      this.setState({ value: e.target.value });
    }

    render() {
      return (
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={() => this.getValidationState()}
          >
            <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />

          </FormGroup>
        </form>
      );

  }

}


export default FormStandard;
