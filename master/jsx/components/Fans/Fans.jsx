import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import Firebase from 'firebase';


class Fans extends React.Component {

    constructor() {
      super();
    //initialize state

    console.log("made it to fans dot jsx constructor");

      this.state =   {

          users_object:{}

      }
    }

    componentWillMount() {
      //get users
      console.log("made it to component will mount.");

      var user = firebase.auth().currentUser;
      var user_id = user.providerData[0].uid;



      //get a reference to the users
      var refUsers= firebase.database().ref('bot/users/');

      //create a reference to this

      var that = this;


      //firebase callback to get a snapsot of the entity

      refUsers.once('value').then(function(snapshot) {
          //log the users
          console.log("printing object within fireavse callback")
          console.log(snapshot.val());
          var a = snapshot.val();
          var keys = Object.keys(a);
          console.log(a);
          console.log(keys);
          that.setState( {

                users_object: a

          });




      });








    }

    render() {

      var that = this;

      console.log("print keys")
      console.log("going to print state")
      console.log(this.state.users_object)

      console.log("print object")


            if (this.state.users_object!=null) {

            return (

            <ContentWrapper>
                <div className="content-heading">Articles</div>
                <Panel header="Blog articles manager">
                    <Table id="datatable1" responsive striped hover>
                        <thead>
                            <tr>
                                <th className="wd-md">Post title</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>Comments</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                          {

                          that.state.user_array.map(function(user, index) {

                          return (<tr>
                              <td>{that.state.users_object['user']['first_name']}
                              </td>
                              <td><a href="">Keith Gutierrez</a>
                              </td>
                              <td><a href="" className="mr">HTML5</a><a href="">JAVASCRIPT</a>
                              </td>
                              <td> <a href="" className="mr-sm label label-primary">angularjs</a><a href="" className="mr-sm label label-primary">mvc</a>
                              </td>
                              <td>10/05/2015</td>
                              <td>10/05/2015</td>
                              <td>1251</td>
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
    <p>hello</p>)

    </ContentWrapper>)

    }

}

export default Fans;
