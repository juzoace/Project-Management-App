import React, { useEffect, useState, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Task from "../../components/Task";
import NewTaskForm from "../../components/NewTask";
import SortBy from "../../components/SortBy";
import UpdateTask from '../../components/UpdateTask';
import "../../css/App.css";
import { encodeUpdateValue, convertToNumber } from "../../utilityFunctions";
import * as actions from "../../store/actions/index";
import { Table, Row, Card, CardHeader, CardBody, Col, Button } from "reactstrap";

const Project = ({}) => {
    const 
    const [loading, loadingState ] = useState(true);
    const [success, successState ] = useState(false);
    let [projects, setProjects ] = useState(null)
    
    useEffect(() => {

        // Make request to the backend and fetch data 
        onFetchProjects(userId)
        .then((response) => {

            if (response.statusText === 'OK') {
                loadingState(false)
                successState(true)
                setProjects(response.data)
                 // Populate the data gotten to a list saved in the state
             
            } 
        })
        .catch((err) => {

        })
       
        // 

    }, [])

    return (
        <div>

        </div>
    )
}

const mapStateToProps = state => { 
    return {
        // tokenValue: state.auth.token
        userId: state.auth._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onTryAutoSignup: () => dispatch( actions.authCheckState()),
        onFetchProjects: (userId) => dispatch(actions.fetchProjects(userId))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)( Project );