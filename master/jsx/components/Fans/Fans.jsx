import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import Firebase from 'firebase';


class Fans extends React.Component {

    constructor() {

      super();

      console.log("made it to fans dot jsx constructor");

      this.state =   {

                users_object:{},
                user_has_bot:false

      }
    }

    componentWillMount() {
      //get users
      console.log("made it to component will mount.");

      var user = firebase.auth().currentUser;
      var user_id = user.providerData[0].uid;

      //see if user has bot
      var current_user = firebase.database().ref('/users/'+ user_id);

      //get a reference to the users
      var refUsers= firebase.database().ref('bot/users/');

      //create a reference to this

      var that = this;


      //firebase cal lback to get a snapsot of the entity
      if (user!=null) {

          refUsers.once('value').then(function(snapshot) {
              //log the users
              console.log("printing object within fireavse callback")
              console.log(snapshot.val());
              var a = snapshot.val();
              var keys = Object.keys(a);
              console.log(a);
              console.log(keys);

              that.setState( {

                    users_object: a,
                    user_has_bot: that.state.user_hasBot

              });
          });

          current_user.once('value').then(function(snapshot) {

              //see if user has a bot connected and update state
              console.log("getting user info");
              console.log(snapshot.val());
              console.log(snapshot.val().bot_connected);
              var local_bot_connected = snapshot.val().bot_connected;

              that.setState( {

                    users_object: that.state.users_object,
                    user_has_bot: local_bot_connected

              });
          });




        }





    }

    render() {

      var that = this;

      console.log("print keys")
      console.log("going to print state")
      console.log(this.state.users_object)
      console.log(this.state.user_has_bot)


      console.log("print object")
      var user_array = Object.keys(this.state.users_object);

            if (this.state.users_object['1169415246433831']!=null && this.state.user_has_bot) {

            return (

            <ContentWrapper>
                <div className="content-heading">Users</div>
                <Panel header="User List">
                    <Table id="datatable1" responsive striped hover>
                        <thead>
                            <tr>
                                <th className="wd-md">Users</th>
                                <th>Avatar</th>
                                <th>ID</th>
                                <th>Gender</th>
                                <th>Created</th>
                                <th>Updated</th>

                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                          {

                          user_array.map(function(user, index) {
                            {console.log(user);
                              console.log(index);
                              console.log(that.state.users_object[user]);
                              console.log(that.state.users_object[user].first_name);
                              var d = that.state.users_object[user];
                              console.log(d['first_name'])

                            }
                          return (<tr>
                              <td>{that.state.users_object[user].first_name + that.state.users_object[user].last_name }
                              </td>
                              <td>

                          {/*  // <!--    <a href="">   </a> --> */}

<img src={that.state.users_object[user].profile_pic }  alt="Smiley face" />


                              </td>


                              <td>{user}
                              </td>
                              <td> {that.state.users_object[user].gender }
                              </td>
                              <td>10/05/2015</td>

                          <td  align="center"     valign="middle" >
                        <a>?</a>
                          </td>


                              <td><a href="" className="mr-sm label label-success">Public</a>
                              </td>
                          </tr>
                            )})

                          }



                        </tbody>
                    </Table>
                </Panel>
            </ContentWrapper>
            )}




    return (<ContentWrapper>
    <p>You need to connect a bot to a page to see who has messaged the page</p>)

    </ContentWrapper>)

    }

}

export default Fans;
