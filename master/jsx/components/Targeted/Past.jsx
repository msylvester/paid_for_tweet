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

      return (

            <ContentWrapper>
                <div className="content-heading">Users</div>
                <Panel header="Past Messages">
                    <Table id="datatable1" responsive striped hover>
                        <thead>
                            <tr>
                                <th className="wd-md">Users</th>
                                <th>Name</th>
                                <th>Date Made</th>
                                <th>Date Sent</th>

                            </tr>
                        </thead>
                        <tbody>

                          {
                          var user_message = Object.keys(this.props.message)
                          user_message.map(function(message, index) {
                            {
                              console.log(message)
                            }
                          return (<tr>
                              <td>{message}
                              </td>

                              <td>{message.date_made}
                              </td>

                              <td>{message.date_sent}
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
