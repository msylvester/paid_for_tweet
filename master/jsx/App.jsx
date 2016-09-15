/*!
 *
 * Angle - Bootstrap Admin App + ReactJS
 *
 * Version: 3.4
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';

import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import BaseHorizontal from './components/Layout/BaseHorizontal';

import Login from './components/Login/Login';
import SingleView from './components/SingleView/SingleView';
import SubMenu from './components/SubMenu/SubMenu';

// Init translation system
initTranslation();
// Init css loader (for themes)



initLoadCss();
window.fbAsyncInit = function() {
  FB.init({
   appId: '1754356628111030',
    cookie: true,
     status:true,
    xfbml: true,
    version: 'v2.7',
  });
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/"  component={Login} />
        <Route component={Base}>

            {/* Default route*/}
            <IndexRoute component={SingleView} />
       
            <Route path="singleview" component={SingleView}/>
            <Route path="submenu" component={SubMenu}/>
          </Route>
    
      
        {/* Not found handler */}
        {/*<Route path="*" component={NotFound}/>*/}

    </Router>,
    document.getElementById('app')
);

};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


