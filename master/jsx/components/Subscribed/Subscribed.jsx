import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, ProgressBar } from 'react-bootstrap';
import Firebase from 'firebase';


class Subscribed extends React.Component {

    constructor(props) {

      super(props);
      this.state = {loading:true, user_dict:{}}

    }

componentDidMount() {
  if (this.props.user.bot_connected === true) {

   const usersRef = firebase.database().ref('bot/' + this.props.user.messenger_token + "/users/");

  usersRef.once('value').then((snapshot) => {
    console.log(snapshot.val())
              const user_array = Object.keys(snapshot.val())
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
        })
  }

  else {

    this.setState({
      loading:false
    })
  }

}
    render() {
      //get the users who are connected


              if(this.state.loading) {
                  return(<ContentWrapper>  <ProgressBar active now={45} /> </ContentWrapper>)

              }
              else {

                if(this.props.user.bot_connected === true) {
                    if(Object.keys(this.state.user_dict).length === undefined || Object.keys(this.state.user_dict).length < 1) {

                      return(<ContentWrapper><p>You do not have any subscribed users</p></ContentWrapper>)
                    }

                    else {


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
