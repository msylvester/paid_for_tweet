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


  constructor(props) {
    super(props)
    console.log("in this short")
    this.state = {preview:false, value:'', select_value:'1', title_value:'',sub_value:'', image_value:'', button_one_title_value:'', button_one_url_value:'', button_two_title_value:'', button_two_url_value:'', button_three_title_value:'', button_three_url_value:'' }
    this.getValidationState = this.getValidationState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubChange = this.handleSubChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleButtonOneUrlChange = this.handleButtonOneUrlChange.bind(this)
    this.handleButtonOneTitleChange = this.handleButtonOneTitleChange.bind(this)
    this.handleButtonTwoUrlChange = this.handleButtonTwoUrlChange.bind(this)
    this.handleButtonTwoTitleChange = this.handleButtonTwoTitleChange.bind(this)
    this.handleButtonThreeUrlChange = this.handleButtonThreeUrlChange.bind(this)
    this.handleButtonThreeTitleChange = this.handleButtonThreeTitleChange.bind(this)
    this.next = this.next.bind(this)
  }
    next(){
      // console.log("here ser ")
      // console.log(this.state.preview)
      // var local = true
      // if (!this.state.preview) {
      //   local = true
      //   this.setState = ( {
      //         preview:true
      //   })
      // }
      // else {
      //   this.setState = ( {
      //         preview:false
      //   })
      // }
      // console.log(local)
      var numberOfButtons= (this.state.select_value ? this.state.select_value:'none');
      var title= (this.state.title_value ?  this.state.title_value:'none');
      var subValue = (this.state.sub_value ? this.state.sub_value:'none')
      var image= (this.state.image_value ? this.state.image_value:'none')
      var buttonOne= (this.state.button_one_title_value ?this.state.button_one_title_value:'none')

     var buttonOneUrl = (this.state.button_one_url_value ?this.state.button_one_url_value:'none')
     var  buttonTwoTitle= (this.state.button_two_title_value ? this.state.button_two_url_value:'none')
     var  buttonTwoUrl= (this.state.button_two_url_value ? this.state.button_two_url_value:'none')
     var  buttonThreeTitle= (this.state.button_three_title_value ? this.state.button_two_url_value:'none')
     var  buttonThreeUrl= (this.state.button_three_url_value ? this.state.button_two_url_value:'none')



     var dict_target = {}
     dict_target['numberOfButtons'] = numberOfButtons
     dict_target['title'] = title
     dict_target['sub'] = subValue
     dict_target['image'] = image
     dict_target['btnOne'] = buttonOne
     dict_target['btnOneUrl'] = buttonOneUrl
     dict_target['btnTwoTitle'] = buttonTwoTitle
     dict_target['btnTwoUrl'] = buttonTwoUrl
     dict_target['btnThreeTitle'] = buttonThreeTitle
     dict_target['btnThreeUrl'] = buttonThreeUrl
      this.props.funct(dict_target)
    }
    getValidationState() {
      //const length = this.state.value.length;
      const length = 11
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
    }

    handleChange(e) {
      console.log(e)
      console.log(e.target.value)
      this.setState({ title_value: e.target.value });
    }


    handleSubChange(e) {
      console.log(e)
      console.log(e.target.value)
      this.setState({ sub_value: e.target.value });
    }



        handleImageChange(e) {
          console.log(e)
          console.log(e.target.value)
          this.setState({ image_value: e.target.value });
        }

        handleButtonOneTitleChange(e) {
          console.log(e)
          console.log(e.target.value)
          this.setState({button_one_title_value: e.target.value });
        }
        handleButtonOneUrlChange(e) {
          console.log(e)
          console.log(e.target.value)
          this.setState({button_one_url_value: e.target.value });
        }

       //
      //   <div id ={"two"}>
      //  <Preview buttons={this.state.select_value} title={this.state.title_value} sub={this.state.sub_value} image={this.state.image_value} buttonOne={this.state.button_one_title_value} buttonOneUrl = {this.state.button_one_url_value}></Preview>
      //  </div>

        handleButtonTwoUrlChange(e) {
          console.log(e)
          console.log(e.target.value)
          this.setState({button_two_url_value: e.target.value });
        }

        handleButtonTwoTitleChange(e) {
          console.log(e)
          console.log(e.target.value)
          this.setState({button_two_title_value: e.target.value });
        }


        handleButtonThreeUrlChange(e) {
          console.log(e)
          console.log(e.target.value)
          this.setState({button_three_url_value: e.target.value });
        }

        handleButtonThreeTitleChange(e) {
          console.log(e)
          console.log(e.target.value)
          this.setState({button_three_title_value: e.target.value });
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
      <div id={"par"}>
        <div id={"child"}>
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
            value={this.state.title_value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />

        <ControlLabel>SubtitleTitle</ControlLabel>
          <FormControl
            type="text"
            value={this.state.sub_value}
            placeholder="Enter text"
            onChange={this.handleSubChange}
          />


        <ControlLabel>ImageURL</ControlLabel>
            <FormControl
              type="text"
              value={this.state.image_value}
              placeholder="Enter text"
              onChange={this.handleImageChange}
            />

          <ControlLabel>Button One Title</ControlLabel>
            <FormControl
              type="text"
              value={this.state.button_one_title_value}
              placeholder="Enter text"
              onChange={this.handleButtonOneTitleChange}
            />


          <ControlLabel>Button One URL</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.button_one_url_value}
                  placeholder="Enter text"
                  onChange={this.handleButtonOneUrlChange}
                />


            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>

        </form>
      </div>
      <div id={"second"}>
        <Button onClick = {this.next}>Preview</Button>
      </div>
    </div>


const b =
<div id={"par"}>
  <div id={"child"}>
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
               value={this.state.title_value}
               placeholder="Enter text"
               onChange={this.handleChange}
             />

           <ControlLabel>SubtitleTitle</ControlLabel>
             <FormControl
               type="text"
               value={this.state.sub_value}
               placeholder="Enter text"
               onChange={this.handleSubChange}
             />


           <ControlLabel>ImageURL</ControlLabel>
               <FormControl
                 type="text"
                 value={this.state.image_value}
                 placeholder="Enter text"
                 onChange={this.handleImageChange}
               />

             <ControlLabel>Button One Title</ControlLabel>
               <FormControl
                 type="text"
                 value={this.state.button_one_title_value}
                 placeholder="Enter text"
                 onChange={this.handleButtonOneTitleChange}
               />


             <ControlLabel>Button One URL</ControlLabel>
                   <FormControl
                     type="text"
                     value={this.state.button_one_url_value}
                     placeholder="Enter text"
                     onChange={this.handleButtonOneUrlChange}
                   />

                 <ControlLabel>Button Two Title</ControlLabel>
                     <FormControl
                       type="text"
                       value={this.state.button_two_title_value}
                       placeholder="Enter text"
                       onChange={this.handleButtonTwoTitleChange}
                     />


                   <ControlLabel>Button Two Url </ControlLabel>
                         <FormControl
                           type="text"
                           value={this.state.button_two_url_value}
                           placeholder="Enter text"
                           onChange={this.handleButtonTwoUrlChange}
                         />



               <FormControl.Feedback />
               <HelpBlock>Validation is based on string length.</HelpBlock>
             </FormGroup>

           </form>
         </div>
         <div id={"second"}>
           <Button onClick = {this.next}>Preview</Button>
         </div>
       </div>
        const c =
        <div id={"par"}>
          <div id={"child"}>
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
                 value={this.state.title_value}
                 placeholder="Enter text"
                 onChange={this.handleChange}
               />

             <ControlLabel>SubtitleTitle</ControlLabel>
               <FormControl
                 type="text"
                 value={this.state.sub_value}
                 placeholder="Enter text"
                 onChange={this.handleSubChange}
               />


             <ControlLabel>ImageURL</ControlLabel>
                 <FormControl
                   type="text"
                   value={this.state.image_value}
                   placeholder="Enter text"
                   onChange={this.handleImageChange}
                 />

               <ControlLabel>Button One Title</ControlLabel>
                 <FormControl
                   type="text"
                   value={this.state.button_one_title_value}
                   placeholder="Enter text"
                   onChange={this.handleButtonOneTitleChange}
                 />


               <ControlLabel>Button One URL</ControlLabel>
                     <FormControl
                       type="text"
                       value={this.state.button_one_url_value}
                       placeholder="Enter text"
                       onChange={this.handleButtonOneUrlChange}
                     />

                   <ControlLabel>Button Two Title</ControlLabel>
                       <FormControl
                         type="text"
                         value={this.state.button_two_title_value}
                         placeholder="Enter text"
                         onChange={this.handleButtonTwoTitleChange}
                       />


                     <ControlLabel>Button Two Url </ControlLabel>
                           <FormControl
                             type="text"
                             value={this.state.button_two_url_value}
                             placeholder="Enter text"
                             onChange={this.handleButtonTwoUrlChange}
                           />

                         <ControlLabel>Button Three Title</ControlLabel>
                             <FormControl
                               type="text"
                               value={this.state.button_three_title_value}
                               placeholder="Enter text"
                               onChange={this.handleButtonThreeTitleChange}
                             />


                           <ControlLabel>Button Three Url</ControlLabel>
                                 <FormControl
                                   type="text"
                                   value={this.state.button_three_url_value}
                                   placeholder="Enter text"
                                   onChange={this.handleButtonThreeUrlChange}
                                 />

               <FormControl.Feedback />
               <HelpBlock>Validation is based on string length.</HelpBlock>
             </FormGroup>

           </form>
         </div>
         <div id={"second"}>
           <Button onClick = {this.next}>Preview</Button>
         </div>
       </div>

    if (!this.state.preview) {
            if (this.state.select_value === "2") {
                console.log(this.state)
                  return(b)
            }
            else if (this.state.select_value ==="3") {
                  console.log(this.state)
                  return(c)
            }
        else {
            console.log(this.state)
          return (a)

        }

  }
else {

  if(this.state.select_value === "2") {
      return( <Preview buttons={this.state.select_value} title={this.state.title_value} sub={this.state.sub_value} image={this.state.image_value} buttonOne={this.state.button_one_title_value} buttonOneUrl = {this.state.button_one_url_value} buttonTwoTitle={this.state.button_two_title_value} buttonTwoUrl={this.state.button_two_url_value}></Preview>)
  }
  else if(this.state.select_Value === "3"){
      return(<Preview buttons={this.state.select_value} title={this.state.title_value} sub={this.state.sub_value} image={this.state.image_value} buttonOne={this.state.button_one_title_value} buttonOneUrl = {this.state.button_one_url_value} buttonTwoTitle={this.state.button_two_title_value} buttonTwoUrl={this.state.button_two_url_value} buttonThreeTitle={this.state.button_three_title_value} buttonThreeUrl={this.state.button_three_url_value}></Preview>)
  }

  else {
  return( <Preview buttons={this.state.select_value} title={this.state.title_value} sub={this.state.sub_value} image={this.state.image_value} buttonOne={this.state.button_one_title_value} buttonOneUrl = {this.state.button_one_url_value}></Preview>)
  }
}

  }
}



export default FormStandard;
