import React, { useState, useEffect } from 'react';
import LiveMessages from './LiveMessages.js';
import ScheduledMessages from './ScheduledMessages';
import ViewAllScheduledMessages from './ViewAllScheduledMessages';
import './coachMessaging.scss';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as MessageBubble } from '../assets/messageBubble.svg';
import { ReactComponent as ScheduleBubble } from '../assets/scheduleBubble.svg';
import { getScheduledMessage } from '../../../../actions/coachActions';

const CoachMessaging = props => {
    const { clientprofile } = props;
    const state = useSelector(state => state.coach);
    const dispatch = useDispatch();
    const [type, setType] = useState(1);

    useEffect(() => {
        if (clientprofile && type === 1) {
            dispatch(getScheduledMessage(clientprofile.clientId));
        }

        if (type === 2) {
            dispatch(getScheduledMessage(clientprofile.clientId));
        }
        //eslint-disable-next-line
    }, [clientprofile, type]);

    return (
        <div className='message-wrapper'>
            <div className='message-header'>
                <div
                    className={`${type === 2 ? 'live-message' : 'active'} `}
                    active={type === 1}
                    left
                    onClick={() => {
                        setType(1);
                    }}
                >
                    <MessageBubble />

                    <h1 className='message-selector'>Messages</h1>
                </div>

                <div
                    className={`${
                        type === 1 ? 'scheduled-message' : 'active'
                    } `}
                    onClick={() => {
                        setType(2);
                    }}
                    active={type === 2}
                >
                    <ScheduleBubble />
                    <h1 className='message-selector'>Schedule a Message</h1>
                </div>
            </div>
            {(() => {
                switch (type) {
                    case 1:
                        return <LiveMessages clientprofile={clientprofile} />;
                    case 2:
                        return (
                            <ViewAllScheduledMessages
                                clientprofile={clientprofile}
                                type={type}
                                messages={state.ScheduledMessages}
                            />
                        );
                    default:
                        return <LiveMessages />;
                }
            })()}
        </div>
    );
};

export default CoachMessaging;
