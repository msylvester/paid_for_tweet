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
import Preview from './Preview'

class FormStandard extends React.Component {


  constructor() {
    super()
    console.log("in this short")
    this.state = {value:'', select_value:''}
    this.getValidationState = this.getValidationState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

    getValidationState() {
      const length = this.state.value.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
    }

    handleChange(e) {
      console.log(e)
      console.log(e.target.value)
      this.setState({ value: e.target.value });
    }

    handleSelect(e) {
          console.log(e.target.value)
    //  console.log(select_value: e.target.value)

    this.setState( {
select_value: e.target.value
    })
    }

    render() {
     const a =
        <div id={"parent"}>
          <div id={"one"}>
        <form key={Math.random()}>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>How Many Buttons?</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.select_value} onChange={this.handleSelect}>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </FormControl>
          </FormGroup>


          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />

          <ControlLabel>SubtitleTitle</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />


          <ControlLabel>ImageURL</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleChange}
              />

            <ControlLabel>Button One Title</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleChange}
              />


            <ControlLabel>Button One URL</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                  />




            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>

        </form>
        </div>
           <div id ={"two"}>
          <Preview buttons={this.state.select_value}></Preview>
          </div>
        </div>

const b =
           <div id={"parent"}>
             <div id={"one"}>
           <form key={Math.random()}>

             <FormGroup controlId="formControlsSelect">
               <ControlLabel>How Many Buttons?</ControlLabel>
               <FormControl componentClass="select" placeholder="select" value={this.state.select_value} onChange={this.handleSelect}>
                 <option value="1">One</option>
                 <option value="2">Two</option>
                 <option value="3">Three</option>
               </FormControl>
             </FormGroup>


             <FormGroup
               controlId="formBasicText"
               validationState={this.getValidationState()}
             >
               <ControlLabel>Title</ControlLabel>
               <FormControl
                 type="text"
                 value={this.state.value}
                 placeholder="Enter text"
                 onChange={this.handleChange}
               />

             <ControlLabel>SubtitleTitle</ControlLabel>
               <FormControl
                 type="text"
                 value={this.state.value}
                 placeholder="Enter text"
                 onChange={this.handleChange}
               />


             <ControlLabel>ImageURL</ControlLabel>
                 <FormControl
                   type="text"
                   value={this.state.value}
                   placeholder="Enter text"
                   onChange={this.handleChange}
                 />

               <ControlLabel>Button One Title</ControlLabel>
                 <FormControl
                   type="text"
                   value={this.state.value}
                   placeholder="Enter text"
                   onChange={this.handleChange}
                 />


               <ControlLabel>Button One URL</ControlLabel>
                     <FormControl
                       type="text"
                       value={this.state.value}
                       placeholder="Enter text"
                       onChange={this.handleChange}
                     />

                   <ControlLabel>Button Two Title</ControlLabel>
                       <FormControl
                         type="text"
                         value={this.state.value}
                         placeholder="Enter text"
                         onChange={this.handleChange}
                       />


                     <ControlLabel>Button Two Url </ControlLabel>
                           <FormControl
                             type="text"
                             value={this.state.value}
                             placeholder="Enter text"
                             onChange={this.handleChange}
                           />



               <FormControl.Feedback />
               <HelpBlock>Validation is based on string length.</HelpBlock>
             </FormGroup>

           </form>
           </div>
              <div id ={"two"}>
             <Preview buttons={this.state.select_value}></Preview>
             </div>
           </div>

        const c =
           <div id={"parent"}>
             <div id={"one"}>
           <form key={Math.random()}>

             <FormGroup controlId="formControlsSelect">
               <ControlLabel>How Many Buttons?</ControlLabel>
               <FormControl componentClass="select" placeholder="select" value={this.state.select_value} onChange={this.handleSelect}>
                 <option value="1">One</option>
                 <option value="2">Two</option>
                 <option value="3">Three</option>
               </FormControl>
             </FormGroup>


             <FormGroup
               controlId="formBasicText"
               validationState={this.getValidationState()}
             >
               <ControlLabel>Title</ControlLabel>
               <FormControl
                 type="text"
                 value={this.state.value}
                 placeholder="Enter text"
                 onChange={this.handleChange}
               />

             <ControlLabel>SubtitleTitle</ControlLabel>
               <FormControl
                 type="text"
                 value={this.state.value}
                 placeholder="Enter text"
                 onChange={this.handleChange}
               />


             <ControlLabel>ImageURL</ControlLabel>
                 <FormControl
                   type="text"
                   value={this.state.value}
                   placeholder="Enter text"
                   onChange={this.handleChange}
                 />

               <ControlLabel>Button One Title</ControlLabel>
                 <FormControl
                   type="text"
                   value={this.state.value}
                   placeholder="Enter text"
                   onChange={this.handleChange}
                 />


               <ControlLabel>Button One URL</ControlLabel>
                     <FormControl
                       type="text"
                       value={this.state.value}
                       placeholder="Enter text"
                       onChange={this.handleChange}
                     />

                   <ControlLabel>Button Two Title</ControlLabel>
                       <FormControl
                         type="text"
                         value={this.state.value}
                         placeholder="Enter text"
                         onChange={this.handleChange}
                       />


                     <ControlLabel>Button Two Url </ControlLabel>
                           <FormControl
                             type="text"
                             value={this.state.value}
                             placeholder="Enter text"
                             onChange={this.handleChange}
                           />

                         <ControlLabel>Button Three Title</ControlLabel>
                             <FormControl
                               type="text"
                               value={this.state.value}
                               placeholder="Enter text"
                               onChange={this.handleChange}
                             />


                           <ControlLabel>Button Three Url</ControlLabel>
                                 <FormControl
                                   type="text"
                                   value={this.state.value}
                                   placeholder="Enter text"
                                   onChange={this.handleChange}
                                 />

               <FormControl.Feedback />
               <HelpBlock>Validation is based on string length.</HelpBlock>
             </FormGroup>

           </form>
           </div>
              <div id ={"two"}>
             <Preview buttons={this.state.select_value}></Preview>
             </div>
           </div>
    if (this.state.select_value === "2") {
          return(b)
    }
    else if (this.state.select_value ==="3") {
          return(c)
    }
else {
  return (a)

}

  }

}


export default FormStandard;
