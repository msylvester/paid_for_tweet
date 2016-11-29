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
      console.log(this.props)


           var name = this.props.message.title ? this.props.message.title:'change'
           var sub_name = this.props.message.sub ? this.props.message.sub:'change'
           var image_url = this.props.message.image ? this.props.message.image:'img/logo.png'
           var button_one_title =  this.props.message.btnOne ? this.props.message.btnOne:'change'
           var button_two_title =  this.props.message.btnTwoTitle ? this.props.message.btnTwoTitle:'change'
           var button_three_title =  this.props.message.btnThreeTitle ?  this.props.message.btnThreeTitle :'change'

           var button_one_url =  this.props.message.btnOneUrl ? this.props.message.btnOneUrl:'change'
           var button_two_url =  this.props.message.btnTwoUrl ? this.props.message.btnTwoUrl :'change'
           var button_three_url =   this.props.message.btnThreeUrl ? this.props.message.btnThreeUrl :'change'


      if (this.props.numberOfButtons === '1') {

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

        <Col xs={10} md={10}>
          <Button onClick={this.props.func_close}>Close</Button>
        </Col>

        </Row>
        </Grid>
        </ContentWrapper>)


      }
       if (this.props.numberOfButtons === '2') {


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
         <Col xs={10} md={10}>
           <Button  onClick={this.props.func_close}>Close</Button>
         </Col>

         </Row>
         </Grid>
         </ContentWrapper>)


      }

     if (this.props.numberOfButtons=== '3') {
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

       <Col xs={10} md={10}>
         <Button  onClick={this.props.func_close}>Close</Button>
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
