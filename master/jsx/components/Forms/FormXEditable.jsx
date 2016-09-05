import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, FormControl, Table } from 'react-bootstrap';
import FormXEditableRun from './FormXEditable.run';

class FormXEditable extends React.Component {
    componentDidMount() {
        FormXEditableRun();
    }
    render() {
        return (
            <ContentWrapper>
                <h3>X-Editable
                   <small>In-place editing</small>
                </h3>
                <div className="clearfix mb-lg">
                    <div className="pull-left">
                        <button id="enable" className="btn btn-default">enable / disable</button>
                    </div>
                    <div className="pull-right">
                        <div className="checkbox c-checkbox">
                            <label>
                                <FormControl id="autoopen" type="checkbox" />
                                <span className="fa fa-check"></span>auto-open next field</label>
                        </div>
                    </div>
                </div>
                <Panel header="Editable inputs">
                    <Table id="user" style={{clear: "both"}} bordered striped>
                        <tbody>
                            <tr>
                                <td width="35%">Simple text field</td>
                                <td width="65%"><a id="username" href="#" data-type="text" data-pk="1" data-title="Enter username">superuser</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Empty text field, required</td>
                                <td>
                                    <a id="firstname" href="#" data-type="text" data-pk="1" data-placement="right" data-placeholder="Required" data-title="Enter your firstname"></a>
                                </td>
                            </tr>
                            <tr>
                                <td>Select, local array, custom display</td>
                                <td>
                                    <a id="sex" href="#" data-type="select" data-pk="1" data-value="" data-title="Select sex"></a>
                                </td>
                            </tr>
                            <tr>
                                <td>Select, remote array, no buttons</td>
                                <td><a id="group" href="#" data-type="select" data-pk="1" data-value="5" data-source="/api/xeditable-groups" data-title="Select group">Admin</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Select, error while loading</td>
                                <td><a id="status" href="#" data-type="select" data-pk="1" data-value="0" data-source="/status" data-title="Select status">Active</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Combodate (date)</td>
                                <td>
                                    <a id="dob" href="#" data-type="combodate" data-value="1984-05-15" data-format="YYYY-MM-DD" data-viewformat="DD/MM/YYYY" data-template="D / MMM / YYYY" data-pk="1"
                                    data-title="Select Date of birth"></a>
                                </td>
                            </tr>
                            <tr>
                                <td>Combodate (datetime)</td>
                                <td>
                                    <a id="event" href="#" data-type="combodate" data-template="D MMM YYYY  HH:mm" data-format="YYYY-MM-DD HH:mm" data-viewformat="MMM D, YYYY, HH:mm" data-pk="1" data-title="Setup event date and time"></a>
                                </td>
                            </tr>
                            <tr>
                                <td>Textarea, buttons below. Submit by <i>ctrl+enter</i>
                                </td>
                                <td><a id="comments" href="#" data-type="textarea" data-pk="1" data-placeholder="Your comments here..." data-title="Enter comments">awesomeuser!</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Checklist</td>
                                <td>
                                    <a id="fruits" href="#" data-type="checklist" data-value="2,3" data-title="Select fruits"></a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Panel>
                <Panel header="Editable table">
                    <Table id="users" bordered condensed>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>age</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><a href="#" data-pk="1">Mike</a>
                                </td>
                                <td> <a href="#" data-pk="1">21</a>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><a href="#" data-pk="2">John</a>
                                </td>
                                <td> <a href="#" data-pk="2">28</a>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><a href="#" data-pk="3">Mary</a>
                                </td>
                                <td> <a href="#" data-pk="3">24</a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Panel>
            </ContentWrapper>
            );
    }

}

export default FormXEditable;

