import React, { useState, useEffect } from 'react';
import MiniMessageCard from './MiniMessageCard';
import { useSelector, useDispatch } from 'react-redux';
import './miniScheduleMsgList.scss';

function MiniScheduleMsgList(props) {
    const { messages } = props;
    // console.log('MiniScheduleMsgList', messages);
    const [messagelist, setmessagelist] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setmessagelist(messages);
    }, [messages]);

    if (messages) {
        return (
            <>
                <div className='mini-list-container'>
                    <h1>Previously Scheduled Messages</h1>
                    {messagelist.slice(-1).map(item => (
                        <div className='mini-card'>
                            <MiniMessageCard
                                item={item}
                                clientId={props.clientId}
                            />
                        </div>
                    ))}
                </div>
            </>
        );
    }
    return <h1>No messages scheduled</h1>;
}

export default MiniScheduleMsgList;
