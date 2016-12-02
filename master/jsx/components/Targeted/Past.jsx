import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import Firebase from 'firebase';
import Preview from './Preview'

class Past extends React.Component {

    constructor(props) {

        super(props)
        this.state = {

          preview:false,
          preview_message:''
        }
        this.use = this.use.bind(this)
        this.func_close = this.func_close.bind(this)
      }


      func_close() {


                this.setState( {

                  preview:false,
                  preview_message:''
                })



      }

    use(e) {


        const struct_message = Object.keys(this.props.message)


        const n = struct_message[e]


        this.setState( {

          preview:true,
          preview_message:this.props.message[n]
        })



    }



    render() {
      var user_message = Object.keys(this.props.message)

      if(this.state.preview === true) {


          return(<Preview numberOfButtons={this.state.preview_message['numberOfButtons']} message={this.state.preview_message} func_close={this.func_close}>  </Preview>)


      }


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
                                <th>Preview Message</th>

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


                              <td>
                                <Button key={index} eventKey={"hello"} bsStyle="info" bsSize="xsmall" onClick= {()=>this.use(index)}>View</Button>

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
