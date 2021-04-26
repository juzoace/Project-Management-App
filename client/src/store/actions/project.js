import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as urls from "../../api/index";
import setAuthToken from '../../utils/setAuthToken';

export const fetchProjects = (userId) => {
    return async dispatch => {
        let response = await axios.post(urls.fetchProjectsUrl, userId)
        return response;
    }
}

