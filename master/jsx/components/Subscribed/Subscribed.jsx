  import React from 'react';
  import ContentWrapper from '../Layout/ContentWrapper';
  import TableTest from '../TableTest/TableTest';
  import { Grid, Row, Col, Panel, Button, Table, ProgressBar } from 'react-bootstrap';
  import Firebase from 'firebase';


  class Subscribed extends React.Component {

      constructor(props) {

        super(props);
        this.state = {loading:true, user_dict:{}}
        this.loading_bar = 10



      }

  componentDidMount() {


    if (this.props.user.bot_connected === true) {


         const usersRef = firebase.database().ref('bot/' + this.props.user.messenger_token + "/users/");

        usersRef.once('value').then((snapshot) => {


          if(snapshot.val()!== null && snapshot.val() !== "undefined") {
                  console.log(snapshot.val())
                  var user_array = []
                  const array_temp = []

                    let user_dict = {}
                    user_array.forEach(key=> {
                          if(snapshot.val()[key]['subscribed'] === true) {
                              user_dict[key] = snapshot.val()[key]

                          }

                    })

                    this.setState({
                        user_dict:user_dict,
                        loading:false

                    })

                  }
                  else {

                    this.setState({
                      loading:false

                    })
                  }

              })


            }

      else {
        this.loading_bar = 100
        this.setState({
          loading:false
        })
      }

    }
  componentWillUpdate(nextProp, nextState)  {

    if (this.loading_bar + 20 < 100) {
      this.loading_bar = this.loading_bar + 20
    }

  }

      render() {
        //get the users who are connected
         const is_user_loaded = Object.keys(this.state.user_dict) ? true:false

                if(this.state.loading) {
                    return(<ContentWrapper>  <ProgressBar label={`${this.loading_bar}%`} active now={this.loading_bar} /> </ContentWrapper>)

                }
                else {

                  if(this.props.user.bot_connected === true) {
                      if(!is_user_loaded) {

                        return(<ContentWrapper><p>You do not have any  users</p></ContentWrapper>)
                      }

                      else {
                          console.log("frustrated")
                          console.log(this.state.user_dict)

                          return(<ContentWrapper><TableTest users={this.state.user_dict}></TableTest></ContentWrapper>)

                      }
                  }
                  else {

                    return(<ContentWrapper><p>No bot connect, click on bot status to connect a bot</p></ContentWrapper>)
                  }
                }
              }
  }
  export default Subscribed
