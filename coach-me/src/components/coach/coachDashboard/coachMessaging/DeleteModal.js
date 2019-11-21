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

    // useEffect grabs the  scheduled message using client Id from the "scheduledMessages" DB and sets the boolean value of deleted to false.
    useEffect(() => {
        dispatch(getScheduledMessage(clientId));
        setDeleted(false);
    }, [deleted]);

    // onClick the delete message will use the scheduleId and the clientId to delete message and toggle local boolean to true and close the model with setShow()
    const deleteMessage = () => {
        dispatch(deleteScheduledMessage(id, clientId));
        setDeleted(true);
        // removedMessage(id);
        setShow();
    };
    // the setShow from parent is passed through props to toggle the cancel and exit svg.
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
