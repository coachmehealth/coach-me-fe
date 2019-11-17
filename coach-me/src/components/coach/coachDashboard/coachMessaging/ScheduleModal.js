import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getScheduledMessage,
    addScheduledMessage
} from '../../../../actions/coachActions';
import { ReactComponent as Exit } from '../../../utils/assets/Xicon.svg';
import './scheduleModal.scss';
const ScheduleModal = props => {
    console.log('ScheduleModal', props);
    const { show, setShow } = props;
    const state = useSelector(state => state.coach);
    console.log('ScheduleModal STATE', state);

    const scheduleMessage = () => {
        setShow();
    };

    return (
        <>
            <div
                className={`${
                    show === false ? 'hidden' : 'schedule-modal-container'
                }`}
            >
                <div className='schedule-modal-box'>
                    <Exit
                        className='exit-icon'
                        onClick={() => {
                            setShow();
                        }}
                    />
                    <h1> Your message has been Scheduled. </h1>
                    <div className='schedule-button-container'>
                        <button
                            className='sch-btn'
                            onClick={() => {
                                scheduleMessage();
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScheduleModal;
