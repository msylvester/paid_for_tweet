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
        console.log("fiond mefr ")
        console.log(props)
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





  // componentDidUpdate(prevProps, prevState) {
  //         if (this.state.login === true && this.state.registered === true && this.state.user == null) {
  //               //make a call to Firebase and get the user
  //
  //
  //
  //                   var firebase_user = firebase.auth().currentUser;
  //
  //
  //                   var userRef = firebase.database().ref('users/' + firebase_user.providerData[0].uid);
  //
  //                   var that = this
  //
  //                   console.log("hello  i hit this ")
  //                   console.log(firebase_user.providerData[0].uid)
  //                   userRef.on('value', function(snapshot) {
  //                     //updateStarCount(postElement, snapshot.val());
  //                       console.log("about to be in this shit sat")
  //                       console.log(snapshot.val())
  //                       if (snapshot.val() != null) {
  //
  //                             this.setState ( { user: snapshot.val() } )
  //
  //
  //                       }
  //                   });
  //             }
  //
  //
  //
  //   }


    componentWillMount() {
        var that = this;


    }


    componentDidMount(){

      var firebase_user = firebase.auth().currentUser;


      var userRef = firebase.database().ref('users/' + firebase_user.providerData[0].uid);



      console.log("hello  i hit this ")
      console.log(firebase_user.providerData[0].uid)

      //if bot connected status changes
      const that = this
      userRef.on('value', (snapshot) =>{
        //updateStarCount(postElement, snapshot.val());
          console.log("about to be in this shit sat")
          console.log(snapshot.val())
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

    //'auth.authResponseChange', checkLoginState

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
//
//         var render_email = ''
//
//         var email_matches = false
//
//
//
//
// var c =  <ContentWrapper>
//         <p>
//
//         You do not have a bot registered with Brainitch. Please email msylvest55@gmail.com to solve.
//         </p>
//
//         </ContentWrapper>
//
// var use =   <Header/>
//   var spinner =   <ContentWrapper>
//
//         <Row>
//           <p>Loading your bot information </p>
//           <Spinner spinnerName='double-bounce' />
//
//         </Row>
//     </ContentWrapper>
//
//
// //three cases, either they have a bot and are login
// //or they login but they are not authroized
// //for authorizd code it is, get authorized list, then compare to current user email
//             console.log(this.state.login)
//             console.log(this.state.registered)
//
//
//             if (!this.state.login || !this.state.registered) {
//
//                 //browserHistory.push(path)
//
//             }
//
//             else if (this.state.login && !this.state.registered) {
//
//               use = c
//
//             }
//
//             else  {
//               //get the current user email
//               var user = firebase.auth().currentUser;
//               console.log(user)
//
//
//
//             //  var getAuthorizedList = firebase.database().ref('Authorized/')
//             if (this.state.user != null)  {
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
            //         }
            //
            //         else {
            //           use = spinner
            //
            //
            //         }
            //
            //
            // }




            return (use)



          }


}
export default Base;
