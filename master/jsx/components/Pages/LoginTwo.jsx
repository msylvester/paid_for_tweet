import React from 'react';
import { Grid, Row, Col, Panel, Button, ProgressBar } from 'react-bootstrap';
import {Link} from 'react-router';
import Login from '../Login/Login'
import Firebase from 'firebase';
import Spinner from 'react-spinkit';
import NotFound from './NotFound';
import LoginEmailPass from './LoginEmailPass';

class LoginTwo extends React.Component {
    constructor(props){
        super(props);

        this.state={
          login: "",
          failed_login:""
        }

        this.onSubmit = this.onSubmit.bind(this);

        }


    componentWillMount(){
      //check to see if a user is logged in, if yes, set login state to true

    }
    onSubmit(e){
      e.preventDefault
      //Check and see if this user is registered or this credetials are correct
      //If credentials are false/ don't exist, set this.failedlogin state to true
    }
    render(){
      if (this.state.login){
        //I want to render  panel, an image and a link to the dashboard
        return (

                    <div className="block-center mt-xl wd-xl">
                         { /* START panel */ }
                         <div className="panel panel-dark panel-flat">
                             <div className="panel-heading text-center">
                                 <a href="#">
                                     <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                                 </a>
                             </div>
                             <div className="panel-body">
                                <Link to={'home'}> Go to dashboard </Link>



                           </div>


                         </div>
                       </div>
            );

      }
      if(this.state.failed_login){
        //I want to return the panel, the text field and  a msg, your password is not good

        return (

                    <div className="block-center mt-xl wd-xl">
                         { /* START panel */ }
                         <div className="panel panel-dark panel-flat">
                             <div className="panel-heading text-center">
                                 <a href="#">
                                     <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                                 </a>
                             </div>
                             <div className="panel-body">
                                 <p className="text-center pv">SIGN IN TO CONTINUE.</p>
                                 <form onSubmit={this.onSubmit}>
                                   <LoginEmailPass />
                                 </form>
                                 <p className="text-center pv">YOUR EMAIL OR PASSWORD WAS WRONG.</p>

                           </div>


                         </div>
                       </div>
            );


      }
      // return to the panel,the image and empty form

      return (

                  <div className="block-center mt-xl wd-xl">
                       { /* START panel */ }
                       <div className="panel panel-dark panel-flat">
                           <div className="panel-heading text-center">
                               <a href="#">
                                   <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
                               </a>
                           </div>
                           <div className="panel-body">
                               <p className="text-center pv">SIGN IN TO CONTINUE.</p>
                                 <form onSubmit={this.onSubmit}>
                                   <LoginEmailPass />
                                 </form>


                         </div>


                       </div>
                     </div>
          );
    }

}



export default LoginTwo;
