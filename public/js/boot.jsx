// init
require('../../views/dashboard.jade');

// global value
global.__test = false;

var React = require('react');
var ReactDOM = require('react-dom');
//import browserHistory from 'react-router/lib/browserHistory';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import Redirect from 'react-router/lib/Redirect';
import { createHistory, useBasename } from "history";
// main view 
var App = require('./components/App.jsx');
var MainProtection = require('./components/Main/Protection/Protection.jsx');
var MainBP = require('./components/Main/BP/BP.jsx');
var MainPerformance = require('./components/Main/Performance/Performance.jsx');
var MainTCPProxy = require('./components/Main/TCPProxy/TCPProxy.jsx');
var MainSSLKey = require('./components/Main/SSLKey/SSLKey.jsx');
var Monitor = require('./components/Main/Monitor/Monitor.jsx');

var settings = require('./setting.js')

const browserHistory = useBasename(createHistory)({
    basename: "/apps/appmonitor"
});

ReactDOM.render(
  <Router history={browserHistory} >
    <Route  component={App} >
      <Redirect from='/' to='dashboard' />
      <Route path='dashboard' component={MainProtection} />
      <Route path="MainBP" component={MainBP} />
      <Route path="MainPerformance" component={MainPerformance} />
    </Route>
  </Router>,
  document.getElementById('app')
);	


