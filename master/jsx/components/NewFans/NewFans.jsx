import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import ChartChartJSRun from './ChartChartJS.run';

class NewFans extends React.Component {

    componentDidMount() {
        ChartChartJSRun();        
    }

    render() {
        return (
            <ContentWrapper>
                <h3>Chart JS</h3>
                <Grid fluid>
                    <Row className="mb-lg">
                        <Col lg={ 6 }>
                            <h4>Line Chart</h4>
                            <div>
                                <canvas id="chartjs-linechart"></canvas>
                            </div>
                        </Col>
                    </Row>
                </Grid>


            </ContentWrapper>
            );
    }

}

export default NewFans;
