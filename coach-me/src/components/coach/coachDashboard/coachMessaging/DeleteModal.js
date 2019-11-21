import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ScheduledMessages.scss';
import { deleteScheduledMessage } from '../../../../actions/coachActions';
import { ReactComponent as Exit } from '../../../utils/assets/Xicon.svg';
import { getScheduledMessage } from '../../../../actions/coachActions';
import './updateModal.scss';

const DeleteModal = props => {
    const { show, id, setShow, removedMessage, clientId } = props;
    const state = useSelector(state => state.coach);
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false);
    // console.log(state);

    useEffect(() => {
        dispatch(getScheduledMessage(clientId));
        setDeleted(false);
    }, [deleted]);

    const deleteMessage = () => {
        dispatch(deleteScheduledMessage(id, clientId));
        setDeleted(true);
        // removedMessage(id);
        setShow();
    };

    return (
        <>
            <div
                className={`${
                    show === false ? 'hidden' : 'delete-modal-container'
                }`}
            >
                <div className='delete-modal-box'>
                    <Exit
                        className='exit-icon'
                        onClick={() => {
                            setShow();
                        }}
                    />
                    <h1> Delete Scheduled Message? </h1>
                    <div className='delete-button-container'>
                        <button
                            className='cancel-bttn'
                            onClick={() => {
                                setShow();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className='del-btn'
                            onClick={() => {
                                deleteMessage();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DeleteModal;
