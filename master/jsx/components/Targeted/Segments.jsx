import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, Alert } from 'react-bootstrap';
import Firebase from 'firebase';

class Segments extends React.Component {

    constructor(props) {

        super(props)
        console.log("In sgemgget")
        console.log(this.props)


    }


    render() {
      var user_segments = Object.keys(this.props.segments)
      return (

            <ContentWrapper>
                <div className="content-heading">Segments</div>
                <Panel header="Existing Segments">
                    <Table id="datatable1" responsive striped hover>
                        <thead>
                            <tr>
                                <th className="wd-md">Gender</th>
                                <th>Age</th>
                                <th>Location</th>
                                <th>Select</th>

                            </tr>
                        </thead>
                        <tbody>

                          {

                          user_segments.map((message, index) =>{

                          return (<tr key={Math.random()}>
                              <td>{this.props.segments[message].gender}
                              </td>

                              <td>{this.props.segments[message].age}
                              </td>

                              <td>{this.props.segments[message].location}
                              </td>

                              <td>
                                <Button bsStyle="info" bsSize="xsmall" onClick= {this.props.handleTargetMessageButtonClick()}>Use</Button>

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

export default Segments;
