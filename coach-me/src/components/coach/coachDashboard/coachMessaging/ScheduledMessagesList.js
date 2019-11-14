import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessageCard from './MessageCard';
import {
    deleteScheduledMessage,
    getScheduledMessage
} from '../../../../actions/coachActions';
import { useDispatch } from 'react-redux';

const ScheduledMessagesList = props => {
    const { messages } = props;
    console.log(messages);
    const dispatch = useDispatch();
    const [messagelist, setmessagelist] = useState([]);

    useEffect(() => {
        if (messages[0] !== undefined) {
            setmessagelist(messages);
        }
        if (messages.length === 0) {
            setmessagelist(messages);
        }
    }, [messages]);

    const removedMessage = id => {
        const filtered = messagelist.filter(item => {
            if (item.scheduleId !== id) {
                console.log('removedMessage line 20', item);
                console.log('removedMessage item', item);
                console.log('removedMessage id', id);
                return [item];
            }
        });

        console.log('filited list', filtered);
        setmessagelist(filtered);
    };
    console.log(messagelist);
    if (messages.length !== 0) {
        return (
            <div>
                {messagelist.map(item => (
                    <MessageCard
                        item={item}
                        clientId={props.clientId}
                        removedMessage={removedMessage}
                    />
                ))}
            </div>
        );
    }

    return <h1>No messages scheduled</h1>;
};

export default ScheduledMessagesList;
