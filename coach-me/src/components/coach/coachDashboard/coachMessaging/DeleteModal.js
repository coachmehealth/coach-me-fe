import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ScheduledMessages.scss';
import { deleteScheduledMessage } from '../../../../actions/coachActions';
import { ReactComponent as Exit } from '../../../utils/assets/Xicon.svg';
import './updateModal.scss';

const DeleteModal = props => {
    const { show, id, setShow, removedMessage } = props;
    const state = useSelector(state => state.coach);
    const dispatch = useDispatch();
    console.log(state);

    const deleteMessage = () => {
        dispatch(deleteScheduledMessage(id));
        removedMessage(id);
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
                            onClick={() => {
                                setShow();
                            }}
                        >
                            cancel
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
