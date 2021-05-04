import React, { useState, useEffect } from 'react';
import {
    Alert, Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import * as actions from "../../store/actions/index"
import { useHistory, Link } from 'react-router-dom';
import './Login.css'


const Login = ({onLogin}) => {

 
let loginSuccess = useSelector(state => state.auth.loginSuccess);
let loginError = useSelector(state => state.auth.loginError);
const history = useHistory();
  
const initialState = {
    email: "",
    password: "",
}
const [ loginDetails, setLoginDetails ] = useState(initialState);
const [ alerts, setAlerts ] = useState(null)

useEffect(() => {
  
  if (loginError) {
    setAlerts({ message: loginError.split("-")[0], type: "danger" })
  }

}, [loginError])

useEffect(() => {

  if(loginSuccess) {
    let loginSuccess = "Login successfully";
    setAlerts({ message: loginSuccess, type: "success" })  
  }

 
}, [loginSuccess])


const onSubmit = async (e) => {
        console.log(loginDetails)
    e.preventDefault();

    onLogin(loginDetails)
}

const switchToRegister = () => {
  history.push('/login')
}

const TimeoutAlert = function ({ message, type }) {

    const timer = setTimeout(onClick, 3000);
    function onClick() {
      clearTimeout(timer)

    //   clearScopeError();

      setAlerts(null);
    };

    


    return (
      <div>
        <Alert onClick={onClick} color={type} variant={type}>
          {message}
        </Alert>
      </div>
    )
  }


    return (
        <div>
            <br></br>
            <br></br>
        <Container className="App">
        <h2> Login</h2>
        <Form className="form" onSubmit={onSubmit}>
        {alerts && <TimeoutAlert message={ alerts.message} type={ alerts.type}  />}
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                required = {true}
                value={loginDetails.email}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                required = {true}
                value={loginDetails.password}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Button className="submit" type="submit">Submit</Button>
          <div>
          <Link className="register" to="/register">Create New Account</Link>
          </div>
          
          
        </Form>
      </Container>
      </div>
    )
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (loginDetails) => dispatch(
            actions.login(loginDetails)
        ),
        // onSetLoginErrorToNull: () => dispatch(
        //     actions.setLoginErrorToNull()
        // )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );