import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';


class TableTest extends React.Component {

constructor(props) {

  super(props)
  console.log(this.props)
}

render() {

const user_array = Object.keys(this.props.users)

return (




<ContentWrapper>
    <div className="content-heading">Users</div>
    <Panel header="User List">
        <Table id="datatable1" responsive striped hover>
            <thead>
                <tr>
                    <th className="wd-md">Name</th>
                    <th>Avatar</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Region</th>
                    <th>First Message Recieved</th>
                    <th>Subscribed</th>
                </tr>
            </thead>
            <tbody>

              {

              user_array.map((user, index) => {

              return (<tr>
                  <td>{this.props.users[user].first_name + " " + this.props.users[user].last_name }
                  </td>
                  <td>

              {/*  // <!--    <a href="">   </a> --> */}

                  <img src={this.props.users[user].profile_pic }  alt="Smiley face" />


                  </td>


                                    <td>{this.props.users[user]['age']}
                                    </td>
                  <td>{this.props.users[user]['gender']}
                  </td>
                  <td> {this.props.users[user]['region']}
                  </td>
                  <td> {this.props.users[user]['first_messaged']}</td>


                  <td><a href="" className="mr-sm label label-success">{this.props.users[user]['first_messaged']}</a>
                  </td>
              </tr>
                )})

              }



            </tbody>
        </Table>
    </Panel>
</ContentWrapper>)}

}
export default TableTest;
