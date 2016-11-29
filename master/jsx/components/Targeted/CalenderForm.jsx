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




class CalenderForm extends React.Component {
  constructor(props) {
    super(props)
    this.getValidationState = this.getValidationState.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectA = this.handleSelectA.bind(this)
    this.func_time = this.func_time.bind(this)
    this.getTimeInfo = this.getTimeInfo.bind(this)
    this.state=  {select_value:'12', select_value_am:'AM'}
  }

  //returns day, month, year, hours and am/pm

  getTimeInfo() {
    //handleselectA gets you the number

  var dict_times = {}
  dict_times['1'] = 13
  dict_times['2'] = 14
  dict_times['3'] = 15
  dict_times['4'] = 16
  dict_times['5'] = 17
  dict_times['6'] = 18
  dict_times['7'] = 19
  dict_times['8'] = 20
  dict_times['9'] = 21
  dict_times['10'] = 22
  dict_times['11'] = 23
  dict_times['12'] = 0

    var accurateTime = this.state.select_value
    if(this.state.select_value_am !== 'AM')  {
          accurateTime = dict_times[this.state.select_value]

    }

    return ("jan", "12", 10000022)


  }

  func_time() {
    //then iam going toc al that
    //get a date a time
    //function get the current time in unix
      var a, b,c = this.getTimeInfo()
      this.props.func_time(a, b, c)


  }
  getValidationState() {

  }

  handleSelect(e) {
    this.setState({ value: e.target.value });
  }

  handleSelectA(e) {
    this.setState({ value: e.target.value });
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
              <ControlLabel>What Time?</ControlLabel>
              <FormControl componentClass="select" placeholder="Choose A Time" value={this.state.select_value} onChange={this.handleSelect}>
                <option value="1">1:00</option>
                <option value="2">2:00</option>
                <option value="3">3:00</option>
                <option value="4">4:00</option>
                <option value="5">5:00</option>
                <option value="6">6:00</option>
                <option value="7">7:00</option>
                <option value="8">8:00</option>
                <option value="9">9:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>

              </FormControl>



              <ControlLabel>AM/PM</ControlLabel>
              <FormControl componentClass="select" placeholder="Choose A Time" value={this.state.select_value} onChange={this.handleSelectA}>
                <option value="PM">PM</option>
                <option value="AM">AM</option>
              </FormControl>
          </FormGroup>
          <Button onClick={this.func_time}>Choose</Button>


  </FormGroup>


      </form>
    );
  }
}


export default CalenderForm;
