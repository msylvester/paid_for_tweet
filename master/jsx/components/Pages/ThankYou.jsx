import React from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { Router, Route, Link, History } from 'react-router';

class ThankYou extends React.Component {

constructor(props) {
  super(props)

  

}
    render() {
        return (
            <div className="abs-center wd-xl">
                <div className="text-center mb-xl">
                    <div className="text-lg mb-lg">Thank you for visiting</div>
                    <p className="lead m0"></p>
                    <p>Brainitch</p>
                </div>
                <div className="input-group mb-xl">
                    <input type="text" placeholder="Try with a search" className="form-control" />
                    <span className="input-group-btn">
                     <button type="button" className="btn btn-default">
                        <em className="fa fa-search"></em>
                     </button>
                  </span>
                </div>
            </div>
            );
    }

}

export default ThankYou;
