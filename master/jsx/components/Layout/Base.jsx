import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Row} from 'react-bootstrap'
import Header from './Header'
import Sidebar from './Sidebar'
import Offsidebar from './Offsidebar'
import Footer from './Footer'
import Login from '../Login/Login'
import Targeted from '../Targeted/Targeted'
import Spinner from 'react-spinkit';
import ContentWrapper from './ContentWrapper';
import NotFound from '../Pages/NotFound'
import FormWizard from '../Forms/FormWizard'
//import Firebase from 'firebase';





class Base extends React.Component {

    constructor(props) {
    //    super();
        super(props)

        this.listeners =  []
        if (this.props.location.state.user != null) {
            this.state = {

                user:this.props.location.state.user,
                connected: this.props.location.state.user.bot_connected


            }
        }
        else  {

          this.state = {

              error:true
          }

        }
        this.page_array_id = []
        console.log("is it here")

    }


    componentWillMount() {
        var that = this;


    }


    componentDidMount(){

      var firebase_user = firebase.auth().currentUser;
      var userRef = firebase.database().ref('users/' + firebase_user.providerData[0].uid);

      //if bot connected status changes
      const that = this
      userRef.on('value', (snapshot) =>{

          that.listeners.push(userRef)
          if (snapshot.val() != null) {

                this.setState ( {
                  user: snapshot.val(),
                  connected: snapshot.val().bot_connected
                })


          }
      });
    }





  componentWillUnMount() {
    //cancel subsription

    if (this.listeners.length > 0) {
        this.listeners.forEach(function(ref) {
          ref.off();
        });
    }


  }




    render() {

        // Animations supported
        const items = [
             'rag-fadeIn',
             'rag-fadeInUp',
             'rag-fadeInDown',
             'rag-fadeInRight',
             'rag-fadeInLeft',
             'rag-fadeInUpBig',
             'rag-fadeInDownBig',
             'rag-fadeInRightBig',
             'rag-fadeInLeftBig',
             'rag-zoomBackDown'
           ]

      //  const animationName = 'rag-fadeIn'
        var animationName = items[Math.floor(Math.random()*items.length)];
        var b = <NotFound/>
        var use = <Header/>
        var  a =                 <div className="wrapper">
                          <Header />

                          <Sidebar />

                          <Offsidebar />

                          <ReactCSSTransitionGroup
                            component="section"
                            transitionName={animationName}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                          >
                            {React.cloneElement(this.props.children, {
                              key: Math.random(),
                              beer: 'g',
                              user: this.state.user,
                              connected: this.state.connnected
                            })}
                          </ReactCSSTransitionGroup>

                          <Footer />
                      </div>


            if (this.state.error != null) {
                      use = b

            }

            else {
                use = a

            }

            return (use)

          }


}
export default Base;
