import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import {Link} from 'react-router';
import ContentWrapper from '../Layout/ContentWrapper';

class Home extends React.Component {

  constructor(props) {
    console.log("herer")
    super(props)
    console.log(props)
  }

    render() {
        return (
            <ContentWrapper>
              <p>Welcome Home {this.props.user.email}</p>
            </ContentWrapper>
            );
    }

}

export default Home;
