import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import FacebookButton  from '../Layout/FacebookButton';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import Firebase from 'firebase';


class Login extends React.Component {

    render() {
        return (
            <ContentWrapper>

                <FacebookButton/>
            </ContentWrapper>
        );
    }
}

export default Login;