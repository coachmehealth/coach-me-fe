import React, { useEffect, useState } from 'react';
import {
    deleteScheduledMessage,
    getScheduledMessage,
    updateScheduledMessage
} from '../../../../actions/coachActions';
import UpdateModal from './UpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from './DeleteModal';
import './messageCard.scss';

const MessageCard = props => {
    const { item, removedMessage } = props;

    const dispatch = useDispatch();

    const [showUpdateModal, setUpdateModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);

    // useEffect(() => {
    //     // if(clientprofile) {
    //     // }

    //     dispatch(getScheduledMessage(props.clientId));
    //     // eslint-disable-next-line
    // }, [props.clientId]);

    const toggleUpdateModal = () => {
        setUpdateModal(!showUpdateModal);
        console.log('hi');
    };
    const toggleDeleteModal = () => {
        setDeleteModal(!showDeleteModal);
        console.log('hi');
    };

    return (
        <>
            <div style={{ border: '1px solid red' }}>
                <div>
                    <p>{item.month}</p>
                    <p>{item.dom}</p>
                    <p>{item.year}</p>
                    <p>{item.msg}</p>
                </div>

                <div className='button-container'>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            console.log('clicked');
                            toggleUpdateModal();
                        }}
                    >
                        {' '}
                        Edit{' '}
                    </button>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            toggleDeleteModal();
                        }}
                    >
                        {' '}
                        Delete
                    </button>
                    <UpdateModal show={showUpdateModal} />
                    <DeleteModal
                        show={showDeleteModal}
                        id={item.scheduleId}
                        removedMessage={removedMessage}
                        setShow={toggleDeleteModal}
                    />
                </div>
            </div>
        </>
    );
};
export default MessageCard;
