import React, { useState } from 'react';
import LiveMessages from './LiveMessages.js';
import ScheduledMessages from './ScheduledMessages';
import './coachMessaging.scss';
import { ReactComponent as MessageBubble } from '../assets/messageBubble.svg';
import { ReactComponent as ScheduleBubble } from '../assets/scheduleBubble.svg';

const CoachMessaging = props => {
    const { clientprofile } = props;
    // console.log(clientprofile)
    const [type, setType] = useState(1);

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
            {(() => {
                switch (type) {
                    case 1:
                        return <LiveMessages clientprofile={clientprofile} />;
                    case 2:
                        return (
                            <ScheduledMessages
                                clientprofile={clientprofile}
                                type={type}
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
