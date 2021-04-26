import * as actionTypes from "../actions/actionTypes"
import { authLoginSuccess } from "../actions/auth";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    _id: null,
}

const reducer = (state = initialState, action ) => {
    switch (action.type ) {
        default:
        return state;
    }
};

export default reducer;