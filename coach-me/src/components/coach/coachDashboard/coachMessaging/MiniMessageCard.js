import React, { useState } from 'react';
import './messageCard.scss';

function MiniMessageCard(props) {
    const { item } = props;
    const [month, setMonth] = useState(item.month);
    const [dom, setDom] = useState(item.dom);

    let suffix = '';
    if (typeof item.dom === 'string') {
        if (item.dom.length > 0) suffix = 'th';
        if (item.dom.endsWith('1') && item.dom !== '11') suffix = 'st';
        if (item.dom.endsWith('2') && item.dom !== '12') suffix = 'nd';
        if (item.dom.endsWith('3') && item.dom !== '13') suffix = 'rd';

        if (month === '' && dom === '') {
            setDom(`${item.weekday}s at`);
        }
        if (month === '' && dom !== '') {
            setMonth(`${item.dom}${suffix} every month`);
            setDom('');
        }
    }

    return (
        <div className='mini-card-container'>
            <div className='date-time-wrapper'>
                <div className='date-container'>
                    <p>{month}</p>
                    <p>{dom},</p>
                    <p>{item.year}</p>
                </div>
                <div className='time-container'>
                    <p>{item.hour}</p>
                    <p>{item.min} </p>
                    <p>{item.ampm}</p>
                </div>
            </div>
            <div className='mini-message-container'>
                <p>{item.msg}</p>
            </div>
        </div>
    );
}

export default MiniMessageCard;
