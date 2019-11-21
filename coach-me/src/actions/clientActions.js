import axios from 'axios';
import {
    GET_CLIENTS_START,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_FAILURE,
    UPDATE_METRIC_START,
    UPDATE_METRIC_SUCCESS,
    UPDATE_METRIC_FAILURE,
    GET_METRICS_START,
    GET_METRICS_SUCCESS,
    GET_METRICS_FAILURE
} from './types';

//Get client info endpoint
export const getClientInfo = props => dispatch => {
    const clientnum = { clientPhone: props.num };
    dispatch({ type: GET_CLIENTS_START });
    axios
        .post(
            `${process.env.REACT_APP_BACK_END_URL}/clientRoute/login`,
            clientnum
        )
        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('loginAttempts', res.data.loginAttempts);
            const loginAttempts = localStorage.getItem('loginAttempts');
            if (loginAttempts == 1) {
                props.history.push('/welcome');
            } else {
                props.history.push('/metrics');
            }

            dispatch({
                type: GET_CLIENTS_SUCCESS,
                payload: res.data.clientObject.fields
            });
        })
        .catch(err => {
            dispatch({
                type: GET_CLIENTS_FAILURE,
                payload: err
            });
        });
};

//Login endpoint for client (uses client phone number from airtable)
export const getClientInfoLogin = props => dispatch => {
    const clientnum = { clientPhone: props.num };
    dispatch({ type: GET_CLIENTS_START });

    axios
        .post(
            `${process.env.REACT_APP_BACK_END_URL}/clientRoute/login`,
            clientnum
        )
        .then(res => {
            localStorage.setItem('token', res.data.token);

            const loginAttempts = localStorage.getItem('loginAttempts');

            props.history.push('/metric-form');

            dispatch({
                type: GET_CLIENTS_SUCCESS,
                payload: res.data.clientObject.fields
            });
        })
        .catch(err => {
            dispatch({
                type: GET_CLIENTS_FAILURE,
                payload: err
            });
        });
};

export const addMetric = metricUpdate => dispatch => {
    dispatch({ type: UPDATE_METRIC_START });
    axios
        .post(
            `${process.env.REACT_APP_BACK_END_URL}/clientRoute/logMetrics `,
            metricUpdate,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            dispatch({
                type: UPDATE_METRIC_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: UPDATE_METRIC_FAILURE,
                payload: err.message
            });
        });
};

export const getClientRecords = () => dispatch => {
    dispatch({ type: GET_METRICS_START });
    axios
        .get(
            `${process.env.REACT_APP_BACK_END_URL}/clientRoute/paginationGetMetrics`,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        )
        .then(results => {
            const clientRecords = [...results.data.clientRecords];
            dispatch({
                type: GET_METRICS_SUCCESS,
                payload: clientRecords
            });
        })
        .catch(err => {
            dispatch({
                type: GET_METRICS_FAILURE,
                payload: err.message
            });
        });
};
