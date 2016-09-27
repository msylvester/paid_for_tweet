import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import FacebookButton  from '../Layout/FacebookButton';
import { Grid, Button, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import Firebase from 'firebase';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';

class Logout extends React.Component {

    constructor() {
    super();
    this.disconnect = this.disconnect.bind(this);


    }



  disconnect() {
  FB.logout(function(response) {
        browserHistory.push('/');

  });
}


  render() {

        var disc = this.disconnect
        return (

        <ContentWrapper>
                <Button bsStyle="primary" bsSize="large" onClick={disc}>Logout</Button>
</ContentWrapper>


        );
    }
}

export default Logout;
