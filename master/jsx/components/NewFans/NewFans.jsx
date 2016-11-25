import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import ChartChartJSRun from './ChartChartJS.run';

var dateLabels = [];
var newUsers = [];
var existingUsers = [];


class NewFans extends React.Component {

    constructor() {
      super();
      this.state = {
          users_object:{},
          user_has_bot:false
      }
    }

    componentWillMount() {
      //get users

      var user = firebase.auth().currentUser;
      var user_id = user.providerData[0].uid;

      var current_user = firebase.database().ref('/users/'+ user_id);
      var refUsers = firebase.database().ref('bot/users/');


      var that = this;


      //firebase callback to get a snapshot of the entity
      if (user!=null) {

          refUsers.once('value').then(function(snapshot) {
              //log the users
              var a = snapshot.val();
              var keys = Object.keys(a);
              that.setState( {
                    users_object: a,
                    user_has_bot: that.state.user_hasBot

              });
          });

          current_user.once('value').then(function(snapshot) {
              var local_bot_connected = snapshot.val().bot_connected;

              that.setState( {
                    users_object: that.state.users_object,
                    user_has_bot: local_bot_connected
              });
          });

        }
    }

    componentDidMount() {

      var that = this;

      // Create a reference to the new user data
      var refNewUserData = firebase.database().ref('bots/EAAXcAzXFvEQBAMYoH4M2kuZBGdeZC5UjZAUpTBOv7lNfhzCoR3FHnUFAIcBb1IYg0KTTe6szKV8zZCYFhaRMk67KsG2w6ZBMQec5TGsNQNP0535meIHY8D5pApjPMgvsdnJsuZB8Tq76efExJGEzfcVSZCmcGBGWAmjZC1dqKxzfWwZDZD/messages_received/date/');

      var newUsers = [] 
      var existing = [] 

      refNewUserData.once('value').then(function(snapshot) {
          //log the dates
          var dates = snapshot.val(); // spits out the whole branch as a dict


              //get the dates
          var dates_array = Object.keys(dates)

          for (var i =0; i<dates_array.length; i++) {
              existing.push(dates[dates_array[i]]['existing_users']); 
              newUsers.push(dates[dates_array[i]]['new_users']); 

          }
             ChartChartJSRun(dates_array, newUsers, existing);

      });

     
    }

    render() {
        return (
        <ContentWrapper>
            <div className="content-heading">
                <div className="pull-right text-center">
                    <div data-sparkline="" data-bar-color="#cfdbe2" data-height="20" data-bar-width="3" data-bar-spacing="2" data-values="1,0,4,9,5,7,8,9,5,7,8,4,7"></div>
                </div>New Users</div>
            <Grid fluid>
              <Row className="mb-lg">
                  <h4>Line Chart</h4>
                  <div>
                      <canvas id="chartjs-linechart"></canvas>
                  </div>
              </Row>
            </Grid>
        </ContentWrapper>
            );
    }
}

export default NewFans;