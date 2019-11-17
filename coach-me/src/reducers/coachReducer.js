import {
    GET_TEXT_START,
    GET_TEXT_SUCCESS,
    ADD_TEXT_START,
    ADD_TEXT_SUCCESS,
    COACH_ERROR,
    GET_RECORDS_START,
    GET_RECORDS_SUCCESS,
    GET_RECORDS_FAILURE,
    GET_METRICS_START,
    GET_METRICS_SUCCESS,
    GET_METRICS_FAILURE,
    GET_CHECKIN,
    GET_GOALS,
    ADD_SCHEDULE_MESSAGE_START,
    ADD_SCHEDULE_MESSAGE_SUCCESS,
    GET_SCHEDULE_MESSAGE_START,
    GET_SCHEDULE_MESSAGE_SUCCESS,
    DELETE_SCHEDULE_MESSAGE_START,
    DELETE_SCHEDULE_MESSAGE_SUCCESS,
    UPDATE_SCHEDULE_MESSAGE_START,
    UPDATE_SCHEDULE_MESSAGE_SUCCESS
} from '../actions/types';

const initialState = {
    messageHistory: [],
    creds: {
        message: '',
        Phone: ''
    },
    loading: false,
    error: null,
    clientRecords: [],
    clientMetrics: [],
    clientCheckIn: '',
    clientGoals: [],
    scheduledMessage: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TEXT_START:
            return {
                ...state,
                loading: true
            };
        case GET_TEXT_SUCCESS:
            return {
                ...state,
                loading: false,
                messageHistory: action.payload
            };
        case ADD_TEXT_START:
            return {
                ...state,
                messages: action.payload,
                loading: true
            };
        case ADD_TEXT_SUCCESS:
            return {
                ...state,
                loading: false,
                creds: {
                    ...state.creds,
                    message: action.payload,
                    Phone: action.payload.Phone
                }
            };
        case GET_SCHEDULE_MESSAGE_START:
        case GET_RECORDS_START:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case GET_RECORDS_SUCCESS:
            return {
                ...state,
                loading: false,
                clientRecords: [...action.payload],
                error: ''
            };
        case GET_SCHEDULE_MESSAGE_SUCCESS:
            // console.log('looook at me', action.payload);
            return {
                ...state,
                loading: false,
                scheduledMessage: action.payload,
                error: ''
            };
        case GET_CHECKIN:
            return {
                ...state,
                loading: false,
                clientCheckIn: action.payload,
                error: ''
            };
        case GET_METRICS_START:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case GET_METRICS_SUCCESS:
            return {
                ...state,
                loading: false,
                clientMetrics: [...action.payload],
                error: ''
            };
        case GET_GOALS:
            return {
                ...state,
                loading: false,
                clientGoals: [...action.payload],
                error: ''
            };
        case ADD_SCHEDULE_MESSAGE_START:
            // console.log(action.payload);
            return {
                ...state,
                loading: true
            };
        case ADD_SCHEDULE_MESSAGE_SUCCESS:
            return {
                ...state,
                laoding: false
            };
        case UPDATE_SCHEDULE_MESSAGE_SUCCESS:
            // console.log('UPDATE_SCHEDULE_MESSAGE', action.payload);
            // return {
            //     ...state,
            //     scheduledMessage: state.scheduledMessage.map(message =>
            //         message.scheduleId === action.payload.id
            //             ? action.payload
            //             : message
            //     )
            // };
            return {
                ...state,
                loading: false
                // scheduledMessage: action.payload
            };

        case GET_METRICS_FAILURE:
        case GET_RECORDS_FAILURE:
        case COACH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
