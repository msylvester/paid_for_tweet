import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Grid, Row, Col, Panel, DropdownButton, MenuItem, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';
import HelpBlock from 'react-bootstrap/lib/HelpBlock'




class ChooseTarget extends React.Component {
  constructor(props) {
    super(props)
    this.getValidationState = this.getValidationState.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectA = this.handleSelectA.bind(this)
    this.close = this.close.bind(this)
    this.state=  {gender:'A', age:'A':, region:'A'}
  }


getValidationState() {
  //const length = this.state.value.length;
  const length = 11
  if (length > 10) return 'success';
  else if (length > 5) return 'warning';
  else if (length > 0) return 'error';
}

  handleSelectRegion(e) {
    this.setState({region: e.target.value });
  }

  handleSelectAge(e) {
    this.setState({ age: e.target.value });
  }

  handleSelectGender(e) {
    this.setState({ gender: e.target.value });
  }

  close() {
      let audience = {

          age:this.stage.age
          gender:this.state.gender,
          region:this.state.region

      }
      this.props.func_close_target(audience)
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>

          <FormGroup controlId="formControlsSelect">
              <ControlLabel>What gender?</ControlLabel>
              <FormControl componentClass="select" placeholder="What gender?" value={this.state.gender} onChange={this.handleSelect}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="A">All Genders</option>


              </FormControl>


              <ControlLabel>What Age Range?</ControlLabel>
              <FormControl componentClass="select" placeholder="What Age Range?" value={this.state.age} onChange={this.handleSelect}>
                <option value="lessThanThirty">Male</option>
                <option value="greaterThanThirty">Female</option>
                <option value="A">All Ages</option>


              </FormControl>


              <ControlLabel>What Region?</ControlLabel>
              <FormControl componentClass="select" placeholder="What region?" value={this.state.range} onChange={this.handleSelectA}>
                <option value="W">West</option>
                <option value="C">Central</option>
                  <option value="E">East</option>
                  <option value="A">AM>All Regions</option>
              </FormControl>
          </FormGroup>

          <Button onClick={ths.close}>Use</Button>


  </FormGroup>


      </form>
    );
  }
})


export default ChooseTarget;
