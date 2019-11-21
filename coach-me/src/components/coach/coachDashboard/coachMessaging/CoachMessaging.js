import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Component Imports
import LiveMessages from './LiveMessages.js';
import ViewAllScheduledMessages from './ViewAllScheduledMessages';
//Redux Actions
import { getScheduledMessage } from '../../../../actions/coachActions';

//Styling
import './coachMessaging.scss';

// SVG Imports
import { ReactComponent as MessageBubble } from '../assets/messageBubble.svg';
import { ReactComponent as ScheduleBubble } from '../assets/scheduleBubble.svg';

const CoachMessaging = props => {
    const { clientprofile } = props;
    const state = useSelector(state => state.coach);
    const dispatch = useDispatch();
    const [type, setType] = useState(1);

    // allows for getScheduledMessage to be called in either the live messages view or viewAllScheduledMessages view.
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

                        // toggleactive()
                    }}
                    active={type === 2}
                >
                    <ScheduleBubble />
                    <h1 className='message-selector'>Schedule a Message</h1>
                </div>
            </div>
            {/* This Switch case allows for switching of component views by looking for type's state to change. */}
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
