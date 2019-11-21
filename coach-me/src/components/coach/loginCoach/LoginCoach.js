import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginCoach } from '../../../actions/authActions';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../utils/assets/coachmelogo-white.svg';

//Component Imports
import Modal from './Modal';

//Styling
import './loginCoach.scss';

const LoginCoach = props => {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const dispatch = useDispatch();
    const [creds, setCreds] = useState({ email: '', password: '' });
    const [modal, setModal] = useState(false);

    const triggerModal = () => {
        setModal(true);
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
        setCreds({
            email: email,
            password: password
        });
    }, [email, password]);

    const handleSubmit = e => {
        console.log(creds);
        e.preventDefault();
        dispatch(loginCoach(creds)).then(() => {
            props.history.push('/dashboard');
        });
    };
    return (
        <>
            {modal ? <Modal setModal={setModal} /> : null}
            <div className='Login-Wrapper'>
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
                    <h1>Login</h1>
                    <p>Welcome back! Please login to your coach account.</p>
                    <form
                        className='Login-Form-Wrapper'
                        onSubmit={e => {
                            handleSubmit(e);
                        }}
                    >
                        <div className='input-Wrapper'>
                            <div className='input-layout'>
                                <label>Email</label>
                                <input
                                    data-cy='input1'
                                    type='text'
                                    placeholder='Email'
                                    name='E-Mail'
                                    className='email'
                                    onChange={handleChange2}
                                    value={email}
                                />
                            </div>
                            <div className='input-layout'>
                                <label>Password</label>
                                <input
                                    data-cy='input2'
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    className='password'
                                    onChange={handleChange3}
                                    value={password}
                                />
                                <div
                                    className='forgot'
                                    onClick={() => triggerModal()}
                                >
                                    Forgot password?
                                </div>
                            </div>
                        </div>
                        <div className='layout-wrapper'>
                            <button type='submit' className='signup-btn'>
                                {' '}
                                Login
                            </button>
                            <div className='register-container'>
                                Don't have an account?{' '}
                                <Link className='register' to='/register'>
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginCoach;
