import React, { useState, useEffect } from 'react';
import './coachDashboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../../actions/authActions';
import { getLastCheckInTime } from '../../../actions/coachActions';
import CoachHeader from './CoachHeader';
import ClientInfo from './clientsList/ClientInfo/ClientInfo';
import SearchForm from './SearchForm';
import CoachMessaging from './coachMessaging/CoachMessaging';
import Metrics from './coachMetricView/Metrics';
import GoalsDisplay from './goals/GoalsDisplay';
import 'react-perfect-scrollbar/dist/css/styles.css';

const CoachDashboard = props => {
    const [clientprofile, setclientprofile] = useState();
    const state = useSelector(state => state.coach);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    useEffect(() => {
        // Gt request to airtable endpoint with api key appended to the end of url

        if (token) {
            dispatch(getClients(token));
        }
        // eslint-disable-next-line
    }, [token]);

    //This sets the default patient as the first in the list for the initial load.
    useEffect(() => {
        setclientprofile(state.clientRecords[0]);
    }, [state.clientRecords]);

    // this function when called, will set local state of clientProfile to the clientId that is called as a value. This then sets the clientProfile state every time a client is clicked on in the Search Form to change the clientprofile in the rest of the coach dashboard props.
    const setClient = clientID => {
        state.clientRecords.filter(client => {
            if (clientID === client.clientId) {
                setclientprofile(client);
            }
        });
    };

    // passing the current clientprofile to all the components in coach dash board
    return (
        <>
            <CoachHeader {...props} />
            <div className='coachdashboard-container'>
                <div className='clientlist-container'>
                    <SearchForm setClient={setClient} />
                </div>
                <div className='clientinfo-container'>
                    <ClientInfo clientprofile={clientprofile} />
                    <GoalsDisplay clientprofile={clientprofile} />
                    <Metrics clientprofile={clientprofile} />
                </div>
                <div className='coach-messaging'>
                    <CoachMessaging clientprofile={clientprofile} />
                </div>
            </div>
        </>
    );
};

export default CoachDashboard;
