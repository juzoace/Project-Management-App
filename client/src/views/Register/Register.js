import React, { useState, useEffect } from 'react';
import {
    Alert, Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import * as actions from "../../store/actions/index"
import { Link, useHistory } from 'react-router-dom';
import './Register.css'
const Register = ({onRegister}) => {

    let registerSuccess = useSelector(state => state.auth.registerSuccess);
    let registerError = useSelector(state => state.auth.registerError);
 
  
    const initialState = {
        email: "",
        name: "",
        password: "",
    }

    const [ registerDetails, setRegisterDetails ] = useState(initialState);
    const [ alerts, setAlerts ] = useState(null)
    const history = useHistory();

    useEffect(() => {
  
        if (registerError) {
          setAlerts({ message: registerError.split("-")[0], type: "danger" })
        }
      
    }, [registerError])

    useEffect(() => {

        if(registerSuccess) {
          let registerSuccess = "Register successfully";
          setAlerts({ message: registerSuccess, type: "success" })  

          setTimeout(() => {
            history.push('/login');
        }, 3000)
        }
      
       
      }, [registerSuccess])

      const onSubmit = async (e) => {
        console.log(registerDetails)
        e.preventDefault();

        onRegister(registerDetails)

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
        <h2>Register</h2>
        <Form className="form" onSubmit={onSubmit}>
        {alerts && <TimeoutAlert message={ alerts.message} type={ alerts.type}  />}
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                required = {true}
                value={registerDetails.email}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                onChange={(e) => setRegisterDetails({...registerDetails, email: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input
                required = {true}
                value={registerDetails.name}
                type="text"
                name="text"
                id="exampleText"
                placeholder="Name"
                onChange={(e) => setRegisterDetails({...registerDetails, name: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                required = {true}
                value={registerDetails.password}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                onChange={(e) => setRegisterDetails({...registerDetails, password: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Button className="submit" type="submit">Submit</Button>
          {/* <Button type="submit">Submit</Button> */}
          <div>
          <Link  className="register" to="/login">Login Account</Link>
          </div>
        </Form>
      </Container>

        </div>
    )

}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (registerDetails) => dispatch(
            actions.register(registerDetails)
        ),
    };
};


export default connect( mapStateToProps, mapDispatchToProps )( Register );