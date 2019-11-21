import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLastCheckInTime } from '../../../../../actions/coachActions';

//Component Imports
import MotiveModal from './MotiveModal';
//Styling
import './clientInfo.scss';

const ClientInfo = props => {
    // console.log('ClientInfo Component', props);

    const state = useSelector(state => state.coach);
    const dispatch = useDispatch();
    // console.log('Client INFO STATE', state);

    const [show, setshow] = useState(false);
    const { clientprofile } = props;

    // checking to see if the client profile and Id exist and if they do execute the getLastCheckInTime action by passing in the client id, if client profile is changed the dependency will re render component to reflect new client profile.
    useEffect(() => {
        if (clientprofile && clientprofile.clientId) {
            dispatch(getLastCheckInTime(clientprofile.clientId));
        }
        // eslint-disable-next-line
    }, [clientprofile]);

    const toggleModal = e => {
        setshow(!show);
    };

    // we need to return a zero for any NaN values that are returned from clientCheckIn
    let checkIn;
    if (isNaN(state.clientCheckIn)) {
        checkIn = '0';
    } else {
        checkIn = state.clientCheckIn;
    }

    if (clientprofile) {
        return (
            <div className='clientprofile'>
                <div className='checkin'>
                    <p className='checkin-label'>LAST CHECK-IN </p>
                    <p className='checkin-date'>{`${checkIn} days ago`}</p>
                </div>

                <MotiveModal
                    toggleModal={toggleModal}
                    motivation={clientprofile.motivations}
                    show={show}
                />
                <div className='key-details'>
                    <h1 className='name'>{clientprofile.clientName}</h1>
                    <div className='details'>
                        {clientprofile.conditions !== 'Unknown' &&
                            clientprofile.conditions.map((conditions, i) => (
                                <p
                                    className={`unknown ${
                                        conditions === 'Pre-diabetes'
                                            ? 'pre-diabetes'
                                            : null
                                    } ${
                                        conditions === 'Diabetes'
                                            ? 'diabetes'
                                            : null
                                    } ${
                                        conditions === 'Hypothyroid'
                                            ? 'hypothyroid'
                                            : null
                                    } ${
                                        conditions === 'High blood pressure'
                                            ? 'bloodPressure'
                                            : null
                                    } ${
                                        conditions === 'Other' ? 'other' : null
                                    }`}
                                >
                                    {conditions}
                                </p>
                            ))}

                        <p
                            className={`${
                                clientprofile.language === 'spanish'
                                    ? 'spanish'
                                    : 'english'
                            }`}
                        >
                            {clientprofile.language}
                        </p>
                    </div>
                </div>
                <div
                    className={`${
                        clientprofile.motivations ? 'motivations' : 'ghost'
                    } `}
                >
                    <div className='motivation-text'>
                        <label>Motivation:</label>
                        <p> {`"${clientprofile.motivations}"`}</p>

                        <button
                            className='seemore'
                            onClick={() => toggleModal()}
                        >
                            {' '}
                            ...See more
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default ClientInfo;
