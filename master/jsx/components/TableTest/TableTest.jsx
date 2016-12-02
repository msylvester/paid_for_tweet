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
const title = this.props.title ? this.props.title:'User'
const top = this.props.top ? true:false



if (top) {

  return (
  <ContentWrapper>
      <div className="content-heading">Top Five</div>
      <Panel header="five most active users">
          <Table id="datatable1" responsive striped hover>
              <thead>
                  <tr>
                      <th className="wd-md">Avatar</th>
                      <th>Name</th>
                      <th>Messages Sent</th>
                  </tr>
              </thead>
              <tbody>

                {

                user_array.map((user, index) => {

                return (<tr>

                    <td>

                {/*  // <!--    <a href="">   </a> --> */}

                    <img width="100%" height="25%" style={{display:"block"}} src={this.props.users[user].profile_pic }  alt="Smiley face" />


                    </td>

                    <td>{this.props.users[user].first_name + " " + this.props.users[user].last_name }
                    </td>



                    <td><a href="" className="mr-sm label label-success">{this.props.users[user].messages_sent}</a>
                    </td>
                </tr>
                  )})

                }



              </tbody>
          </Table>
      </Panel>
  </ContentWrapper>)



}
return (
<ContentWrapper>
    <div className="content-heading">{title}</div>
    <Panel header={title+" List"}>
        <Table id="datatable1" responsive striped hover>
            <thead>
                <tr>
                    <th className="wd-md">Avatar</th>
                    <th>Name</th>
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
                var sub = ""
                if (this.props.users[user]['subscribed']) {
                      sub = "Yes"

                }
                else {
                    sub = "No"
                }
              return (<tr>

                  <td>

              {/*  // <!--    <a href="">   </a> --> */}

                  <img width="100%" height="25%" style={{display:"block"}} src={this.props.users[user].profile_pic }  alt="Smiley face" />


                  </td>

                  <td>{this.props.users[user].first_name + " " + this.props.users[user].last_name }
                  </td>
                                    <td>{this.props.users[user]['age']}
                                    </td>
                  <td>{this.props.users[user]['gender']}
                  </td>
                  <td> {this.props.users[user]['region']}
                  </td>
                  <td> {this.props.users[user]['first_messaged']}</td>


                  <td><a href="" className="mr-sm label label-success">{sub}</a>
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
