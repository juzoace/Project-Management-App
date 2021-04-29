import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "./store/actions/index";
import setAuthToken from './utils/setAuthToken'

const Project = React.lazy(() => import ("./views/Project/Project"));
const Register = React.lazy(() => import("./views/Register/Register"));
const Login = React.lazy(() => import("./views/Login/Login"));
const NotFound = React.lazy(() => import("./views/NotFound/NotFound"));
// const Welcome = React.lazy(() => import ("./views/Welcome/Welcome"));
const loading = () => <div className='animated fadeIn pt-3 text-center'>Loading...</div>;

class App extends Component { 
  componentDidMount () {
    console.log('Try am')
     this.props.onTryAutoSignup(); 
  }

  render () {
    let routes = (
      <Suspense fallback={loading()}>
        <Switch>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' name='Login' component={Login}/>
          <Redirect to="/login" />
          <Route exact path='/*' name='' component={NotFound}/>
        </Switch>
      </Suspense>
    );
      console.log(this.props.isAuthenticated)
    if ( this.props.isAuthenticated ) {
      routes = (
        <Suspense fallback={loading()}>
          <Switch>
          <Route path='/project' name='Project' component={Project} />
          <Redirect to="/project" />
          </Switch>
        </Suspense>
      );
     }

     return (
       <div>
         {routes}
       </div>
     )
  }
 
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    // isAuthenticated: state.auth.token,
    tokenValue: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() ),
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
