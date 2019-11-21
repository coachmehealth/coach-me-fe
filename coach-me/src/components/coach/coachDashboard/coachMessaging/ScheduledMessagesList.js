import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Component Imports
import MessageCard from './MessageCard';

// SVG Import
import backArrow from '../../../utils/assets/back.svg';

// Styling
import './messageCard.scss';

const ScheduledMessagesList = props => {
    const state = useSelector(state => state.coach);
    const { show, toggleScheduler } = props;
    const [messagelist, setmessagelist] = useState([]);

    const removedMessage = id => {
        const filtered = messagelist.filter(item => {
            if (item.scheduleId !== id) {
                return [item];
            }
        });

        setmessagelist(filtered);
    };
    const updatedMessage = id => {
        const updated = messagelist.filter(item => {
            if (item.scheduleId !== id) {
                return [item];
            }
        });
        setmessagelist(updated);
    };

    if (state.scheduledMessage !== 0) {
        return (
            <div className='message-list-wrapper'>
                <div className='back-bttn-container'>
                    <img
                        //misspelling
                        className='back-button-sheduler'
                        alt='back'
                        src={backArrow}
                        onClick={() => toggleScheduler(show)}
                    ></img>
                    <h1 onClick={() => toggleScheduler(show)}>Back</h1>
                </div>
                <h1 className='title-text'>Previously Scheduled Messages</h1>
                <div className='message-list-container'>
                    <PerfectScrollbar className='schedule-scrollbar-container'>
                        {state.scheduledMessage.map(item => (
                            <MessageCard
                                className='message-card'
                                item={item}
                                clientId={props.clientId}
                                removedMessage={removedMessage}
                                updatedMessage={updatedMessage}
                            />
                        ))}
                    </PerfectScrollbar>
                </div>
            </div>
        );
    }
    return <h1>No messages scheduled</h1>;
    // }
    // return null
};
export default ScheduledMessagesList;
