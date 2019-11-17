import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScheduledMessagesList from './ScheduledMessagesList';
import ScheduledMessages from './ScheduledMessages';
import MiniScheduleMsgList from './MiniScheduleMsgList';
import { getScheduledMessage } from '../../../../actions/coachActions';
import './viewAllScheduledMessages.scss';

function ViewAllScheduledMessages(props) {
    const { clientprofile, type } = props;
    const dispatch = useDispatch();
    const state = useSelector(state => state.coach);
    const [show, setShow] = useState(false);
    const [messagelist, setmessagelist] = useState([]);

    //initial GET for scheduled Messages, useEffect set to change when new client is clicked
    useEffect(() => {
        dispatch(getScheduledMessage(clientprofile.clientId));
    }, [clientprofile.clientId]);

    const toggleScheduler = e => {
        setShow(!show);
    };

    if (!show) {
        return (
            <>
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
