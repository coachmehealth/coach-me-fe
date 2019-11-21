import React, { useState, useEffect } from 'react';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import './messageCard.scss';

const MessageCard = props => {
    const { item, removedMessage, updatedMessage, clientId } = props;

    const [showUpdateModal, setUpdateModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [date, setDate] = useState('');

    useEffect(() => {
        let suffix = '';
        if (typeof item.dom === 'string') {
            if (item.dom.length > 0) suffix = 'th';
            if (item.dom.endsWith('1') && item.dom !== '11') suffix = 'st';
            if (item.dom.endsWith('2') && item.dom !== '12') suffix = 'nd';
            if (item.dom.endsWith('3') && item.dom !== '13') suffix = 'rd';

            if (item.month === '' && item.dom === '') {
                setDate(`${item.weekday}s`);
            }
            if (item.month === '' && item.dom !== '') {
                setDate(`${item.dom}${suffix} of every month`);
            }
            if (item.month !== '' && item.dom !== '') {
                setDate(`${item.month} ${item.dom}, ${item.year}`);
            }
        }
    }, [item]);

    const toggleUpdateModal = () => {
        setUpdateModal(!showUpdateModal);
    };
    const toggleDeleteModal = () => {
        setDeleteModal(!showDeleteModal);
    };

    return (
        <>
            <div className='message-card-container'>
                <div className='message-card'>
                    <div className='date-time-wrapper'>
                        <div className='date-container'>
                            <p>{date}</p>
                        </div>
                        <div className='time-container'>
                            <p>{`${item.hour}:${item.min} ${item.ampm}`}</p>
                        </div>
                    </div>
                    <div className='scheduled-message-container'>
                        <p>{item.msg}</p>
                    </div>
                </div>
                <div className='button-container'>
                    <button
                        className='edit-bttn'
                        onClick={e => {
                            e.preventDefault();
                            toggleUpdateModal();
                        }}
                    >
                        {' '}
                        Edit{' '}
                    </button>
                    <button
                        className='delete-bttn'
                        onClick={e => {
                            e.preventDefault();
                            toggleDeleteModal();
                        }}
                    >
                        {' '}
                        Delete
                    </button>
                    <UpdateModal
                        show={showUpdateModal}
                        id={item.scheduleId}
                        updatedMessage={updatedMessage}
                        setShow={toggleUpdateModal}
                        clientId={clientId}
                        messageObj={item}
                    />
                    <DeleteModal
                        show={showDeleteModal}
                        id={item.scheduleId}
                        removedMessage={removedMessage}
                        setShow={toggleDeleteModal}
                        clientId={clientId}
                    />
                </div>
            </div>
        </>
    );
};
export default MessageCard;
