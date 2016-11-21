import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem, Button, FormGroup, ControlLabel } from 'react-bootstrap';
import Firebase from 'firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';






class Targeted extends React.Component {

  constructor() {

    super();
    this.state = {past_posts:'', closeDate:'',date:'', send_now:'', close:'', connected: '', first:'', second:'', third:'', four:'', five:'', type: '', buttons:'',value:'M', value_buttons:'', button_card_title:'', button_one_title:'', button_one_url:'', button_two_url:'', button_two_title:'', button_three_url:'', button_three_title:'', calender:'', startDate:moment()}
    this.send_message = this.send_message.bind(this)
    this.old_segment = this.old_segment.bind(this)
    this.new_segment = this.new_segment.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.handle_date_change = this.handle_date_change.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.message_types_function = this.message_types_function.bind(this)
    this.select_buttons = this.select_buttons.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeButtons = this.handleChangeButtons.bind(this)
    this.handleChangeButtonOneTitle = this.handleChangeButtonOneTitle.bind(this)
    this.handleChangeButtonOneURL = this.handleChangeButtonOneURL.bind(this)

    this.handleChangeButtonTwoTitle = this.handleChangeButtonTwoTitle.bind(this)
    this.handleChangeButtonTwoURL = this.handleChangeButtonTwoURL.bind(this)

    this.handleChangeButtonThreeTitle = this.handleChangeButtonThreeTitle.bind(this)
    this.handleChangeButtonThreeURL = this.handleChangeButtonThreeURL.bind(this)

    this.handleChangeButtonTitle = this.handleChangeButtonTitle.bind(this)
  this.handleSubmitButton_cheap = this.handleSubmitButton_cheap.bind(this)
    this.handleSubmitButton = this.handleSubmitButton.bind(this)
      this.handleDateSubmitButton = this.handleDateSubmitButton.bind(this)
    this.send_now = this.send_now.bind(this)
    this.send_later = this.send_later.bind(this)
    this.past = this.past.bind(this)
    }


  componentWillMount() {


      var user = firebase.auth().currentUser;
      console.log(user)

      if (user != null) {

            var that = this;
            var starCountRef = firebase.database().ref('users/' +   user.providerData[0].uid);
            starCountRef.once('value').then(function(snapshot) {
                         console.log(snapshot.val());
                  console.log(snapshot.val().bot_connected);
                   console.log(snapshot.val().pages);
                that.setState ( {
                  connected:snapshot.val().bot_connected


                })

            });


            }
}


past() {

  this.setState( {

    past_posts:true

  })

}

handle_date_change(date) {


  this.setState({
  startDate: date
})
}
select_buttons(event, num_of_buttons) {
  console.log("Here in selec tbuttons")
  console.log(num_of_buttons)
  const buttons = ["One":1, "Two":2, "Three":3]

  this.setState(  {
    show_now:false,
    one:false,
    two:false,
    third:false,
    four:false,
    five:false,
    calender: false,
    type:'',
    buttons:'',
    value:'',
    button_one_url:'',
    button_one_title:'',
    button_two_title:'',
    button_two_url:'',
    button_three_url:'',
    button_three_title:'',
    buttons:num_of_buttons

}
  )

console.log(num_of_buttons)
console.log(this.state.buttons)
}

message_types_function(event, second) {

  //check to see which one they grabbed
  const object_type = {"Text Based Message":"one", "Image":"two", "Gif":"three", "Video":"four", "Button":"five"}
  this.setState(  {
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    type:object_type[second]

}
  )}

handleDateSubmitButton() {
  this.setState(  {
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    calender: false,
    closeDate:true,
    type:'',
    buttons:'',
    value:'',
    button_one_url:'',
    button_one_title:'',
    button_two_title:'',
    button_two_url:'',
    button_three_url:'',
    button_three_title:''

  })
}

//design for image based, enter text
handleChange(event) {
  this.setState({value: event.target.value});
}

handleChangeButtons(event) {
  this.setState({value_buttons: event.target.value});
}

handleChangeButtonTitle(event) {
this.setState({button_card_title: event.target.value});
}

handleChangeButtonOneTitle(event) {
this.setState({button_one_title: event.target.value});
}


handleChangeButtonOneURL(event) {
this.setState({button_one_url: event.target.value});
}


handleChangeButtonTwoTitle(event) {
this.setState({button_two_title: event.target.value});
}


handleChangeButtonTwoURL(event) {
this.setState({button_two_url: event.target.value});
}


handleChangeButtonThreeTitle(event) {
this.setState({button_three_title: event.target.value});
}


handleChangeButtonThreeURL(event) {
this.setState({button_three_url: event.target.value});
}

handleSubmit(event) {
  this.setState(  {
    one:false,
    two:false,
    three:false,
    four:false,
    five:true

  })
}

handleSubmitButton(event) {

//check to see how many buttons there are
var user = firebase.auth().currentUser;
 let uid = user.providerData[0].uid;

  const newPostKey = firebase.database().ref().child('struct_message').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
if (this.state.buttons == "One") {
  let  postData = {
      button: 1,
      button_one_title:this.state.button_one_title,
      button_one_url:this.state.button_one_url,
      button_title: this.state.button_title

    }
      let updates = {};
       updates['/posts/' + newPostKey] = postData;
       updates['/user-posts/' + uid + '/' + newPostKey] = postData;

       firebase.database().ref().update(updates);

  this.clearState()
}


if (this.state.buttons == "Two") {


  let postData = {
    buttons: 2,
    button_one_title:this.state.button_one_title,
    button_one_url:this.state.button_one_url,
    button_two_title: this.state.button_two_title,
    button_two_url:this.state.button_two_url,
    button_title: this.state.button_title

  }
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
  this.clearState()

}
if (this.state.buttons == "Three") {
let postData = {
  buttons : 3,
  button_one_title: this.state.button_one_title,
  button_one_url : this.state.button_one_url,
  button_two_title : this.state.button_two_title,
  button_two_url : this.state.button_two_url,
  button_three_title : this.state.button_three_title,
  button_three_url : this.state.button_three_url,
  button_title :this.state.button_title
}


   var updates = {};
   updates['/posts/' + newPostKey] = postData;
   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

   firebase.database().ref().update(updates);
   this.clearState()

}
}
handleSubmitButton_cheap(event)   {this.clearState()}
send_later() {
this.setState( {
  one:false,
  two:false,
  third:false,
  four:false,
  five:false,
  show_now:false,
  calender: true,
  close:false,
  type:'',
  buttons:'',
  value:'',
  button_one_url:'',
  button_one_title:'',
  button_two_title:'',
  button_two_url:'',
  button_three_url:'',
  button_three_title:''
})
}



send_now() {
this.setState( {
  one:false,
  two:false,
  third:false,
  four:false,
  five:false,
  show_now:false,
  calender: false,
  close:true,
  type:'',
  buttons:'',
  value:'',
  button_one_url:'',
  button_one_title:'',
  button_two_title:'',
  button_two_url:'',
  button_three_url:'',
  button_three_title:''
})
}

clearState() {


  this.setState(  {
    one:false,
    two:false,
    third:false,
    four:false,
    five:false,
    show_now:true,
    calender: false,
    type:'',
    buttons:'',
    value:'',
    button_one_url:'',
    button_one_title:'',
    button_two_title:'',
    button_two_url:'',
    button_three_url:'',
    button_three_title:''

  })

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

  send_message() {

    this.setState(  {

      first:true

    })
  }

  old_segment() {

    this.setState(  {

      first:false,
      second:true

    })
  }

  new_segment() {

    this.setState(  {

      first:false,
      third:true

    })
  }

select_past() {


}

    render() {
        const func_disc = this.send_message
        const func_use_old  = this.old_segment
        const func_use_new = this.new_segment
        const message_types = ["Text Based Message", "Image", "Gif", "Video", "Button"]
        const func_select = this.message_types_function
        const buttons = ["One", "Two", "Three"]
        const func_select_buttons = this.select_buttons
        const func_select_past = this.select_past
        const past = ["10/10/15", "09/13/15"]
        const func_send_now = this.send_now
        const func_send_later = this.send_later
        let varied_a = <ContentWrapper><p>"Nothing"</p></ContentWrapper>
        let that = this

        const func_past_posts = this.past
        if (this.state.past_posts===true) {
//make table
          return(<ContentWrapper>
            <p>You havent made any posts and do not have any pending </p>

          </ContentWrapper>)
        }

        //once they hit the big one
        if (this.state.close===true) {
          return(<ContentWrapper>
          <p>your message has been sent</p>
          </ContentWrapper>)


        }
        if (this.state.closeDate===true) {
          return(<ContentWrapper>
          <p>your message will be sent on </p>

          </ContentWrapper>)


        }

        if (this.state.show_now ===true) {
          //we want to show show the buttons

          return (
              <ContentWrapper>



                  <Button bsStyle="primary" bsSize="large" onClick={func_send_now}>Send Now</Button>

                  <Button bsStyle="primary" bsSize="large" onClick={func_send_later}>Send Later</Button>
                    </ContentWrapper>
          );


        }


        if (this.state.calender===true) {
            //show calender

            return (
              <ContentWrapper>
              <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handle_date_change} >

            </DatePicker>
                  <Button onClick={this.handleDateSubmitButton}>
                        Submit
                      </Button>

                  </ContentWrapper>)
        }

        if (this.state.buttons=="One") {

          //make one text field


                    return(<ContentWrapper>
                     <div>
                            <input
                            type="text"
                           value={"enter title for button"}
                           onChange={this.handleChangeButtonOneTitle}
                            />
                            <input
                            type="text"
                           value={"enter url that button links to"}
                           onChange={this.handleChangeButtonOneURL}
                            />

                            <input
                            type="text"
                           value={"enter title of structured message"}
                           onChange={this.handleChangeButtonTitle}
                            />

                          <Button onClick={this.handleSubmitButton_cheap}>
                              Submit
                            </Button>
                          </div>
          </ContentWrapper>)

        }

        if (this.state.buttons=="Two") {

          return(<ContentWrapper>
           <div>
                  <input
                  type="text"
                 value={"enter title for button"}
                 onChange={this.handleChangeButtonOneTitle}
                  />
                  <input
                  type="text"
                 value={"enter url that button links to"}
                 onChange={this.handleChangeButtonOneURL}
                  />
                  <input
                  type="text"
                 value={"enter title for button two"}
                 onChange={this.handleChangeButtonTwoTitle}
                  />
                  <input
                  type="text"
                 value={"enter url that button two links to"}
                 onChange={this.handleChangeButtonTwoURL}
                  />



                  <input
                  type="text"
                 value={"enter title of strcutured message"}
                 onChange={this.handleChangeButtonTitle}
                  />





                <Button onClick={this.handleSubmitButton_cheap}>
                    Submit
                  </Button>
                </div>
        </ContentWrapper>)

        }

        if (this.state.buttons=="Three")  {



          return(<ContentWrapper>
           <div>
                  <input
                  type="text"
                 value={"enter title for button"}
                 onChange={this.handleChangeButtonOneTitle}
                  />
                <p></p>
                  <input
                  type="text"
                 value={"enter url that button links to"}
                 onChange={this.handleChangeButtonOneURL}
                  />

              <p></p>
                  <input
                  type="text"
                 value={"enter title for button two"}
                 onChange={this.handleChangeButtonTwoTitle}
                  />
                <p></p>
                  <input
                  type="text"
                 value={"enter url that button two links to"}
                 onChange={this.handleChangeButtonTwoURL}
                  />

<p></p>
                  <input
                  type="text"
                 value={"enter title for button three"}
                 onChange={this.handleChangeButtonThreeTitle}
                  />
                <p></p>
                  <input
                  type="text"
                 value={"enter url that button three links to"}
                 onChange={this.handleChangeButtonThreeURL}
                  />


                  <input
                  type="text"
                 value={"enter title of strcutured message"}
                 onChange={this.handleChangeButtonTitle}
                  />





                <Button onClick={this.handleSubmitButton_cheap}>
                    Submit
                  </Button>
                </div>
        </ContentWrapper>)







        }

        if (this.state.type == "one")  {

          return(<ContentWrapper>
           <div>
                  <input
                  type="text"
                 value={"Enter Text To send"}
                 onChange={this.handleChange}
                  />
                  <Button onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </div>
</ContentWrapper>)

        }
        if (this.state.type == "two")  {

          return(<ContentWrapper>
           <div>
                  <input
                  type="text"
                 value={"enter url of image "}
                 onChange={this.handleChange}
                  />
                  <Button onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </div>
</ContentWrapper>)

        }


        if (this.state.type == "three")  {

          return(<ContentWrapper>
           <div>
                  <input
                  type="text"
                 value={"enter url of gif"}
                 onChange={this.handleChange}
                  />
                  <Button onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </div>
</ContentWrapper>)

        }


        if (this.state.type == "four")  {

          return(<ContentWrapper>
           <div>
                  <input
                  type="text"
                 value={"enter url of video"}
                 onChange={this.handleChange}
                  />
                  <Button onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </div>
</ContentWrapper>)

        }


        if (this.state.type == "five")  {

          return(<ContentWrapper>
           <div>

                <Dropdown id = {"tree"}>
                        <Dropdown.Toggle>
                              How Many buttons would you like
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animated fadeInUpShort">

                          {
                          buttons.map(function(key, i) {

                            return (<MenuItem key={key.id} eventKey={key} data-set-lang="en" onSelect={func_select_buttons}>{key}</MenuItem>);

                          })
                          }

                        </Dropdown.Menu>

                      </Dropdown>

                  <Button onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </div>
</ContentWrapper>)

        }

        if (this.state.five == true)   {
      return( <Dropdown id = {"base"}>
            <Dropdown.Toggle>
                  Choose what to send
            </Dropdown.Toggle>
            <Dropdown.Menu className="animated fadeInUpShort">

              {
              message_types.map(function(key, i) {

                return (<MenuItem key={key.id} eventKey={key} data-set-lang="en" onSelect={func_select}>{key}</MenuItem>);

              })
              }

            </Dropdown.Menu>

          </Dropdown>)




        }


        if (this.state.first === true) {

        return (
            <ContentWrapper>



                <Button bsStyle="primary" bsSize="large" onClick={func_use_old}>Use existing Segment</Button>

                <Button bsStyle="primary" bsSize="large" onClick={func_use_new}>Use new segment</Button>
                  </ContentWrapper>
        );
        }

        if (this.state.second === true) {
          //use old
          return(
        <Dropdown id = {"use new"}>
                <Dropdown.Toggle>
                    Select A Segment
                </Dropdown.Toggle>
                <Dropdown.Menu className="animated fadeInUpShort">

                  {
                  past.map(function(key, i) {

                    return (<MenuItem key={key.id} eventKey={key} data-set-lang="en" onSelect={func_select_past}>{key}</MenuItem>);

                  })
                  }

                </Dropdown.Menu>

              </Dropdown>)



        }

        if (this.state.third === true) {
          //use new
          return (
          <ContentWrapper>


          <div>
            <p>
              Please select your audience
            </p>
            <select value={this.state.value} onChange={this.handleChange}>
                   <option value="M">Male</option>
                   <option value="F">Female</option>
                    <option value="B">Both</option>
                 </select>
                 <p>
      Choose your Age
                 </p>
                 <select value={this.state.value} onChange={this.handleChange}>
                        <option value="M">16</option>
                        <option value="F">17</option>
                         <option value="B">18</option>
                      </select>


                      <p>
                      Choose Your GeoGraphic location
                      </p>
                      <select value={this.state.value} onChange={this.handleChange}>
                             <option value="M">WestUS</option>
                             <option value="F">CentralUS</option>
                              <option value="B">NorthEastUS</option>
                           </select>


            <Button onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
          </ContentWrapper>)

        }


        return (
            <ContentWrapper>



                <Button bsStyle="primary" bsSize="large" onClick={func_disc}>Send a Targeted Message</Button>
          <Button bsStyle="primary" bsSize="large" onClick={func_past_posts}>See past posts</Button>

              </ContentWrapper>
        );
    }
}

export default Targeted;
