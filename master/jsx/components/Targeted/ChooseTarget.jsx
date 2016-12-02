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
    this.handleSelectRegion = this.handleSelectRegion.bind(this)
    this.handleSelectGender = this.handleSelectGender.bind(this)

    this.handleSelectAge = this.handleSelectAge.bind(this)
    this.closeTarget = this.closeTarget.bind(this)
    this.state=  {close:'', gender:'A', age:'A', region:'A'}
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

  closeTarget() {
      let audience = {

          age:this.state.age,
          gender:this.state.gender,
          region:this.state.region

      }
      this.props.func_close_target(audience)
    
      this.setState({close:true})

  }

  render() {

    if(this.state.close===true) {

      return null
    }

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
              <FormControl componentClass="select" placeholder="What gender?" value={this.state.gender} onChange={this.handleSelectGender}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="A">All Genders</option>


              </FormControl>


              <ControlLabel>What Age Range?</ControlLabel>
              <FormControl componentClass="select" placeholder="What Age Range?" value={this.state.age} onChange={this.handleSelectAge}>
                <option value="lessThanThirty">Under Thirty Only</option>
                <option value="greaterThanThirty">Over Thirty Only</option>
                <option value="A">All Ages</option>


              </FormControl>


              <ControlLabel>What Region?</ControlLabel>
              <FormControl componentClass="select" placeholder="What region?" value={this.state.range} onChange={this.handleSelectRegion}>
                <option value="W">West</option>
                <option value="C">Central</option>
                  <option value="E">East</option>
                  <option value="A">AM>All Regions</option>
              </FormControl>
          </FormGroup>

          <Button onClick={this.closeTarget}>Use</Button>


  </FormGroup>


      </form>
    );
  }
}


export default ChooseTarget;
