import React, { useState } from 'react';

import axios from 'axios';

//Styling
import './modal.scss';

const Modal = ({ setModal }) => {
    const [email, setEmail] = useState('');
    const [showError, setShowError] = useState(false);
    const [messageFromServer, setMessageFromServer] = useState('');

    const handleChange = event => {
        setEmail(event.target.value);
    };

    const cancel = () => {
        setModal(false);
    };

    const sendEmail = e => {
        e.preventDefault();
        if (email === '') {
            setShowError(false);
            setMessageFromServer('');
        } else {
            axios
                .post(`${process.env.REACT_APP_BACK_END_URL}/forgotPassword`, {
                    email: email
                })
                .then(res => {
                    if (res.data === 'email not in db') {
                        setShowError(true);
                        setMessageFromServer('');
                    } else if (res.data === 'recovery email sent') {
                        setShowError(false);
                        setMessageFromServer('recovery email sent');
                    }
                })
                .catch(err => {
                    console.log(err.data);
                });
        }
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='top-content'>
                    <h1>Forgot your password?</h1>
                    <p className='direction'>
                        Enter the email you used to sign up and we’ll send you
                        an email with instructions to reset your password.
                    </p>
                </div>
                <div className='input-container'>
                    <input
                        data-cy='input4'
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                    ></input>
                </div>
                {showError && (
                    <p className='error'>
                        That email address isn't recognized. Please try again or
                        register for a new account.
                    </p>
                )}
                {messageFromServer === 'recovery email sent' && (
                    <h3 className='success'>
                        Password Reset Email Successfully Sent!
                    </h3>
                )}
                <div className='continue'>
                    <p className='cancel' onClick={cancel}>
                        Cancel
                    </p>
                    <div className='send-btn' onClick={sendEmail}>
                        Send
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
