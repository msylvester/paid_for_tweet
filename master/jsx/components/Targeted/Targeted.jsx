import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Checkbox, Form, FormControl, Grid, Row, Col, Dropdown, MenuItem, Button, FormGroup, ControlLabel } from 'react-bootstrap';
import Firebase from 'firebase';
import Past from './Past'
import Segments from './Segments'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FormStandard from './FormStandard'
import Preview from './Preview'
import CalenderForm from './CalenderForm'
import ChooseTarget from './ChooseTarget'


class Targeted extends React.Component {

  constructor(props) {

    super(props);
    console.log('Targeted')
    console.log(this.props.user.bot_connected)
    console.log(props)
    this._send_only_message = ""
    this.state = {audience:'', time:'', message_preview: '', preview: -1, past_posts:'',closeDate:'',date:'', send_now:'', close:'', connected: this.props.user.bot_connected, first:'', second:'', third:'', four:'', five:'', type: '', buttons:'',value:'M', value_buttons:'', button_card_title:'', button_one_title:'', button_one_url:'', button_two_url:'', button_two_title:'', button_three_url:'', button_three_title:'', calender:'', startDate:moment()}
    this.send_message = this.send_message.bind(this)
    this.old_segment = this.old_segment.bind(this)
    this.new_segment = this.new_segment.bind(this)

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
    this.handleTargetMessageButtonClick = this.handleTargetMessageButtonClick.bind(this)
    this.handleChangeForMessage = this.handleChangeForMessage.bind(this)
    this.handleFromButtons = this.handleFromButtons.bind(this)
    this.func_close = this.func_close.bind(this)
    this.closeTime = this.closeTime.bind(this)
    this.func_close_target = this.func_close_target.bind(this)

    }

componentWillUpdate(nextProps, nextState) {

}


func_close_target(audience)  {

      console.log(audience['age'])
      console.log(audience['gender'])
      console.log(audience['region'])
      var gender = audience['gender']
      var age = audience['age']
      var region = audience['region']






    console.log('d')
    console.log(gender)
    var lclAudience = {
          gender:gender,
          age:age,
          region:region
      }

    console.log(lclAudience)
    console.log(this)

    this.setState( {
        third:false,
        type:"one",
        audience

    })
console.log(this.state)

}

func_time(month, day, unix) {

    var time = {}
    time['month'] = montht
    time['day'] = day
    time['unix'] = unix

    this.setState({
      calender:false,
      closeDate:true,
      timee:time

    })
}

closeTime() {
  //write the message to firebase
console.log(this.state)

  this.setState( {
    one:false,
    two:false,
    third:false,
    four:false,
    five:false,
    show_now:false,
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


//get audience
handleTargetMessageButtonClick(audience) {

    var gender = audience['gender']
    var age = audience['age']
    var region = audience['region']


    var lclAudience = {
        gender:gender,
        age:age,
        region:region
    }

      this.setState({
        second:false,
        type:"one",
        audience:audience
          }
      )

}


past() {

  this.setState( {

    past_posts:true

  })

}

handleFromButtons(message) {
  console.log("that worked")
  console.log(message)
  if(message.numberOfButtons === '1') {


    this.setState({

      preview:1,
      message_preview:message

    })
  }

  else if (message.numberOfButtons === '2') {

    this.setState({

      preview:1,
      message_preview:message

    })

  }

  else if (message.numberOfButtons === '3') {

    this.setState({

      preview:1,
      message_preview:message

    })

  }
  else {

    this.setState({

      preview:1,
      message_preview:message

    })
  }



}

func_close() {
  console.log(this)

  this.setState({
    preview:0,
    five:false,
    type:'',
    show_now:true

  })
}


handle_date_change(date) {


  this.setState({
  startDate: date
})
}
select_buttons(event, num_of_buttons) {

  const buttons = ["One":1, "Two":2, "Three":3]

  this.setState({
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

    })

  }

message_types_function(event, second) {

  //check to see which one they grabbed
  const object_type = {"Text Based Message":"one", "Image":"two", "Gif":"three", "Video":"four", "Button":"five"}


  this.setState(  {
      one:false,
      two:false,
      third:false,
      four:false,
      five:false,
      type:object_type[event]

    })
  }

handleDateSubmitButton() {
  this.setState(  {
    one:false,
    two:false,
    third:false,
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
componentWillUpdate(nextProp, n) {


}

//design for image based, enter text
handleChangeForMessage(event) {



        try{

          this.setState({value: event.target.value});
        }
        catch (ex) {
          console.log(ex)
        }


  }


//design for image based, enter text
handleChange(event) {

      try{

        this.setState({value: event.target.value});
      }
      catch (ex) {
        console.log("hery mes ")
      }


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

handleSubmit() {
  //get the info from the text box

  this.setState(  {
    one:false,
    two:false,
    three:false,
    four:false,
    five:true

  })


}

handleSubmitButton(event) { //check to see how many buttons there are
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

      }}




handleSubmitButton_cheap(event)   {this.clearState()}

send_later() {
      this.setState( {

        show_now:false,
        calender: true,
        close:false,

      })
}

send_now() {

  var newPostKey = firebase.database().ref("users/" + this.props.user.uid +"/struct_message").push().key;
  var newPostKeyTwo = firebase.database().ref("users/" + this.props.user.uid +"/segments").push().key;
  var postData = {
      date_made:+ new Date(),
      date_sent:'',
      message:this.state.message_preview,
      messenger_token:this.props.user.messenger_token,
      segment:newPostKeyTwo

  }

  var postDataTwo= {

      age:this.state.audience.age,
      gender:this.state.audience.gender,
      region:this.state.audience.region


  }

  var update = {}
  update['users/'+this.props.user.uid+ "/struct_message/" + newPostKey]= postData;
  update['struct_message/' + newPostKey] = postData;
  firebase.database().ref().update(update);




  var update_two = {}
  update_two['users/'+this.props.user.uid+ "/segments/" + newPostKeyTwo]= postDataTwo;
  update_two['segments/' + newPostKeyTwo] = postDataTwo;
  firebase.database().ref().update(update_two);



console.log(this.state)
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



  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  send_message() {
    console.log("clicked here")
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

  select_past() {}


    render() {
      //  const Use an = this.send_message
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
        const func_disc = this.send_message


        let varied_a = <ContentWrapper><p>"Nothing"</p></ContentWrapper>
        let that = this
        const func_past_posts = this.past



//make sure they have a bot connected

if (this.props.user.bot_connected) {



        //see if user clicked past posts
        if (this.state.past_posts===true) {


          return (<Past message = {this.props.user.struct_message}> </Past>)

        }

        //once they hit the big one
        if (this.state.close===true) {
          return(<ContentWrapper>
          <p>your message will be sent in the next ten minutes</p>
          </ContentWrapper>)


        }
        if (this.state.closeDate===true) {
          return(<ContentWrapper>
          <p>your message will be sent on {this.state.time}</p>

          </ContentWrapper>)


        }

        if (this.state.third === true) {
              return (<ContentWrapper><ChooseTarget func_close_target = {this.func_close_target}></ChooseTarget></ContentWrapper>)

        }

        if (this.state.show_now ===true) {
          //we want to show show the buttons

          return (
              <ContentWrapper>



                  <Button bsStyle="primary" bsSize="large" onClick={func_send_now}>Send Now</Button>
                  <p> </p>
                  <Button bsStyle="primary" bsSize="large" onClick={func_send_later}>Send Later</Button>
                    </ContentWrapper>
          );


        }


        if (this.state.calender===true) {
            //show calender
            return(<ContentWrapper><p>Send Later is currently under developmet 😂.  Do you want to send now?</p>
                <Button bsStyle="primary" bsSize="large" onClick={func_send_now}>Send Now</Button></ContentWrapper>)
            // <CalenderForm func_time={this.closeTime}></CalenderForm>)
        }



        if (this.state.type == "one")  {
          if (this.state.preview === 1)  {
            return(<Preview numberOfButtons={this.state.message_preview.numberOfButtons} message={this.state.message_preview} func_close={this.func_close}>  </Preview>)
          }
          if (this.state.preview === 0)  {
            return(<Preview numberOfButtons={this.state.message_preview.numberOfButtons} message={this.state.message_preview} func_close={this.func_close}>  </Preview>)
          }

          else {
           return(<ContentWrapper><FormStandard funct={this.handleFromButtons} ></FormStandard> </ContentWrapper>)
          }
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





        if (this.state.five == true)   {

/*
  
*/



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
              <ContentWrapper>

                    <Segments segments= {this.props.user.segments} handleTargetMessageButtonClick = {this.handleTargetMessageButtonClick}  >
                    </Segments>
                  </ContentWrapper>

                )
        }





        return (
            <ContentWrapper>



                <Button bsStyle="primary" bsSize="large" onClick={func_disc}>Send a Targeted Message</Button>
          <Button bsStyle="primary" bsSize="large" onClick={func_past_posts}>See past posts</Button>

              </ContentWrapper>
        );
    }

    return (
        <ContentWrapper>



            <p>you need to connect a bot</p>
          </ContentWrapper>
    );

  }
}

export default Targeted;
