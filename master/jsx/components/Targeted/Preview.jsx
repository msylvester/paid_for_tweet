import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, Thumbnail } from 'react-bootstrap';
import Firebase from 'firebase';


class Preview extends React.Component {

    constructor(props) {
        console.log(props)
        super(props)
    }


    render() {
      //get the name
      var name = this.props.name ? this.props.name:'change'
      var sub_name = this.props.sub_name ? this.props.sub_name:'change'
      var image_url =  this.props.image_url ? this.props.image_url:"img/logo.png"
      var button_one_title =  this.props.button_one_title ? this.props.button_one_title:'change'
      var button_two_title =  this.props.button_two_title ? this.props.button_two_title:'change'
      var button_three_title =  this.props.button_thre_title ? this.props.button_three_title:'change'

      var button_one_url =  this.props.button_one_url ? this.props.button_one_url:'change'
      var button_two_url =  this.props.button_two_url ? this.props.button_two_url:'change'
      var button_three_url =  this.props.button_three_url ? this.props.button_three_url:'change'

      if (this.props.buttons === '1') {

        return(<ContentWrapper>
        <Grid>
        <Row>
        <Col xs={10} md={10}>
          <Thumbnail src={image_url}  alt="242x200">


            <h3>{name}</h3>
            <p>{sub_name}</p>

              <Button bsStyle="primary" onClick={this.goToOne}>{button_one_title}</Button>

          </Thumbnail>
        </Col>
        </Row>
        </Grid>
        </ContentWrapper>)


      }
       if (this.props.buttons === '2') {


         return(<ContentWrapper>
         <Grid>
         <Row>
         <Col xs={10} md={10}>
           <Thumbnail src={image_url}  alt="242x200">


             <h3>{name}</h3>
             <p>{sub_name}</p>

               <Button bsStyle="primary" onClick={this.goToOne}>{button_one_title}</Button>
               <p></p>
                  <Button bsStyle="primary" onClick={this.goToTwo}>{button_two_title}</Button>

           </Thumbnail>
         </Col>
         </Row>
         </Grid>
         </ContentWrapper>)


      }

     if (this.props.buttons === '3') {
       return(<ContentWrapper>
       <Grid>
       <Row>
       <Col xs={10} md={10}>
         <Thumbnail src={image_url}  alt="242x200">


           <h3>{name}</h3>
           <p>{sub_name}</p>

             <Button bsStyle="primary" onClick={this.goToOne}>{button_one_title}</Button>
             <p></p>
                <Button bsStyle="primary" onClick={this.goToTwo}>{button_two_title}</Button>
                  <p></p>
                     <Button bsStyle="primary" onClick={this.goToThree}>{button_three_title}</Button>

         </Thumbnail>
       </Col>
       </Row>
       </Grid>
       </ContentWrapper>)
     }

     return(<ContentWrapper>
     <Grid>
     <Row>
     <Col xs={10} md={10}>
       <Thumbnail src={image_url}  alt="242x200">


         <h3>{name}</h3>
         <p>{sub_name}</p>

       </Thumbnail>
     </Col>
     </Row>
     </Grid>
     </ContentWrapper>)


  }
}

export default Preview;
