import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Component Imports
import ScheduledMessagesList from './ScheduledMessagesList';
import ScheduledMessages from './ScheduledMessages';
import MiniScheduleMsgList from './MiniScheduleMsgList';

//Redux Action
import { getScheduledMessage } from '../../../../actions/coachActions';

//Styling
import './viewAllScheduledMessages.scss';

function ViewAllScheduledMessages(props) {
    const { clientprofile, type } = props;
    const dispatch = useDispatch();
    const state = useSelector(state => state.coach);
    const [show, setShow] = useState(false);

    //initial GET for scheduled Messages, useEffect set to change when new client is clicked
    useEffect(() => {
        dispatch(getScheduledMessage(clientprofile.clientId));
    }, [clientprofile.clientId]);

    const toggleScheduler = e => {
        setShow(!show);
    };
    // toggling two different views off local state boolean value so we can see the various features of schedule a message
    if (!show) {
        return (
            <>
                <PerfectScrollbar className='schedule-message-container'>
                    <div className='ScheduleMessages-Container-Main'>
                        <ScheduledMessages
                            clientprofile={props.clientprofile}
                            type={type}
                        />
                    </div>
                    <div className='mini-list'>
                        <MiniScheduleMsgList
                            clientId={clientprofile.clientId}
                            messages={state.scheduledMessage}
                        />
                        <button
                            className='veiw-all-button'
                            onClick={() => toggleScheduler()}
                        >
                            View All
                        </button>
                    </div>
                </PerfectScrollbar>
            </>
        );
    } else {
        return (
            <ScheduledMessagesList
                clientId={clientprofile.clientId}
                messages={state.scheduledMessage}
                show={show}
                toggleScheduler={toggleScheduler}
            />
        );
    }
}

export default ViewAllScheduledMessages;
