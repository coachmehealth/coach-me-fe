import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ResetPassword = ({ match }) => {
    const [reset, setReset] = useState({
        email: '',
        password: ''
    });
    const [update, setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log(match.params.token, 'TOKEN');
        axios
            .get('http://localhost:4000/reset', {
                params: {
                    resetPasswordToken: match.params.token
                }
            })
            .then(res => {
                console.log(res);
                if (res.data.message === 'password reset link a-ok') {
                    setReset({ ...reset, email: res.data.email });
                    setUpdate(false);
                    setIsLoading(false);
                    setError(false);
                } else {
                    setUpdate(false);
                    setIsLoading(false);
                    setError(true);
                }
            })
            .catch(err => console.log(err.data));
    }, []);

    const handleInputChange = e => {
        e.preventDefault();
        setReset({ ...reset, [e.target.name]: e.target.value });
    };

    const updatePassword = e => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:4000/updatePasswordRoute/updatePasswordViaEmail',
                {
                    email: reset.email,
                    password: reset.password
                }
            )
            .then(res => {
                console.log(res.data);
                if (res.data.message === 'password updated') {
                    setUpdate(true);
                    setError(false);
                } else {
                    setUpdate(false);
                    setError(true);
                }
            })
            .catch(err => {
                console.log(err.data);
            });
    };

    return (
        <div>
            <form onSubmit={updatePassword}>
                <input
                    type='text'
                    value={reset.email}
                    name='email'
                    placeholder='Email'
                    onChange={handleInputChange}
                />
                <input
                    type='text'
                    value={reset.password}
                    name='password'
                    placeholder='Password'
                    onChange={handleInputChange}
                />

                <button>Submit</button>
            </form>
            {update && <h1> Password Updated Successfully</h1>}
        </div>
    );
};
