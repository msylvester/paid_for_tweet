import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import Firebase from 'firebase';


class Past extends React.Component {

    constructor(props) {
        console.log(props)
        super(props)
    }


    render() {
      var user_message = Object.keys(this.props.message)
      return (

            <ContentWrapper>
                <div className="content-heading">Past Messages</div>
                <Panel header="Past Messages">
                    <Table id="datatable1" responsive striped hover>
                        <thead>
                            <tr>
                                <th className="wd-md">Name</th>
                                <th>Date Made</th>
                                <th>Date Sent</th>

                            </tr>
                        </thead>
                        <tbody>

                          {

                          user_message.map((message, index) =>{

                          return (<tr>
                              <td>{message}
                              </td>

                              <td>{this.props.message[message].date_made}
                              </td>

                              <td>{this.props.message[message].date_sent}
                              </td>

                          </tr>
                            )})

                          }



                        </tbody>
                    </Table>
                </Panel>
            </ContentWrapper>
            )}


}

export default Past;
