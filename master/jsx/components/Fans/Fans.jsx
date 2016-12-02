import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import TableTest from '../TableTest/TableTest';
import { Grid, Row, Col, Panel, Button, Table, ProgressBar } from 'react-bootstrap';
import Firebase from 'firebase';



class Fans extends React.Component {

    constructor(props) {


      super(props);
      this.state = {loading:true, user_dict:{}}
      this.loading_bar = 10



    }

componentDidMount() {

  console.log(this)
  console.log("**ERR #E!@#R !@E R@~@ #")
  console.log(this.props)
  if (this.props.user.bot_connected === true) {
  console.log("I think it is failing there")
  const usersRef = firebase.database().ref('bot/' + this.props.user.messenger_token + "/users/");
  console.log("gonna log shit ")
 console.log(usersRef)

  usersRef.once('value').then((snapshot) => {
        console.log("******")
        console.log(snapshot.val())
        const array_temp = []

        if(snapshot.val()!== null && snapshot.val()!== "undefined" ) {


              var user_dict = {}
              var user_array = []

              var user_array_truth = Object.keys(snapshot.val()).length>0 ? true:false
              if(!user_array_truth) {

                this.setState({


                    loading:false

                })
                return
              }
              user_array.forEach(key=> {

                        user_dict[key] = snapshot.val()[key]



              })
              console.log(user_dict)
              this.loading_bar = 100
              console.log(this)
              this.setState({

                  user_dict:snapshot.val(),
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

  console.log("about to log stte for this sfasns")
  console.log(this.state)
  console.log(nextState)
}

    render() {
      //get the users who are connected
       const is_user_loaded = Object.keys(this.state.user_dict).length>0 ? true:false

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
export default Fans
