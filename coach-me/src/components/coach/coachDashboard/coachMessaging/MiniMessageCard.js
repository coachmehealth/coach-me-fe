import React, { useState } from 'react';
import './messageCard.scss';

function MiniMessageCard(props) {
    const { item } = props;
    const [date, setDate] = useState('');

    let suffix = '';
    if (typeof item.dom === 'string') {
        if (item.dom.length > 0) suffix = 'th';
        if (item.dom.endsWith('1') && item.dom !== '11') suffix = 'st';
        if (item.dom.endsWith('2') && item.dom !== '12') suffix = 'nd';
        if (item.dom.endsWith('3') && item.dom !== '13') suffix = 'rd';

        //date === '' added to prevent infinite loop
        if (item.month === '' && item.dom === '' && date === '') {
            setDate(`${item.weekday}s,`);
        }
        if (item.month === '' && item.dom !== '' && date === '') {
            setDate(`${item.dom}${suffix} of every month,`);
        }
        if (item.month !== '' && item.dom !== '' && date === '') {
            setDate(`${item.month} ${item.dom}, ${item.year}`);
        }
    }

    return (
        <div className='mini-card-container'>
            <div className='date-time-wrapper'>
                <div className='date-container'>
                    <p>{date}</p>
                </div>
                <div className='time-container'>
                    <p>{`${item.hour}:${item.min} ${item.ampm}`}</p>
                </div>
            </div>
            <div className='mini-message-container'>
                <p>{item.msg}</p>
            </div>
        </div>
    );
}

export default MiniMessageCard;
