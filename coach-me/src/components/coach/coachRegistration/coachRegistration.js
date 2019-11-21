import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactComponent as Logo } from '../../utils/assets/coachmelogo-white.svg';

// Redux Action
import { registerCoach } from '../../../actions/authActions';

//Styling
import './coachRegistration.scss';

function CoachRegistration(props) {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [register, setregister] = useState();

    const handleChange = e => {
        e.preventDefault();

        setFullName(e.target.value);
    };
    const handleChange2 = e => {
        e.preventDefault();
        setemail(e.target.value);
    };
    const handleChange3 = e => {
        e.preventDefault();

        setpassword(e.target.value);
    };

    useEffect(() => {
        setregister({
            records: [
                {
                    fields: {
                        name: fullName,
                        email: email,
                        password: password
                    }
                }
            ]
        });
    }, [fullName, email, password]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(registerCoach(register)).then(() => {
            props.history.push('/dashboard');
        });
    };
    return (
        <div className='Register-Wrapper'>
            <div className='side-one'>
                <div className='logo-wrapper'>
                    <a href='https://www.coachmehealth.org'>
                        <Logo className='logo' />
                    </a>
                </div>
                <div className='objective'>
                    <p>
                        We're patient-first, a non-profit, and in the fight
                        against chronic disease.
                    </p>
                </div>
            </div>

            <div className='side-two'>
                <h1>Sign Up</h1>
                <p>Welcome to CoachMe! Please create a new coach account.</p>
                <form
                    onSubmit={e => {
                        handleSubmit(e);
                    }}
                    className='Register-Form-Wrapper'
                >
                    <div className='input-Wrapper'>
                        <div className='input-layout'>
                            <label>FullName</label>
                            <input
                                data-cy='input1'
                                type='text'
                                placeholder='Full Name'
                                name='name'
                                onChange={handleChange}
                                value={fullName}
                                className='fullname'
                            />
                        </div>
                        <div className='input-layout'>
                            <label>Email</label>
                            <input
                                data-cy='input2'
                                type='text'
                                placeholder='Email'
                                name='email'
                                onChange={handleChange2}
                                value={email}
                                className='email'
                            />
                        </div>
                        <div className='input-layout'>
                            <label>Password</label>
                            <input
                                data-cy='input3'
                                type='password'
                                placeholder='Password'
                                name='password'
                                onChange={handleChange3}
                                value={password}
                                className='password'
                            />
                        </div>
                    </div>
                    <div className='layout-wrapper'>
                        <button className='signup-btn' type='submit'>
                            Sign-up
                        </button>

                        <div className='login-container'>
                            Already have an account?{' '}
                            <Link className='login' to='/login'>
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CoachRegistration;
