import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { translate } from '../../utils/language/translate';

// Styling
import './welcomeScreen.scss';

const WelcomeScreen = props => {
    const [coach, setCoach] = useState();
    const state = useSelector(state => state.client);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACK_END_URL}/clientRoute/getCoachInfo`,
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            )
            .then(res => setCoach(res.data))
            .catch(err => console.log(err.message));
    }, []);

    return (
        <div className='welcomeScreen'>
            <h1>
                {translate('welcome')} <br /> CoachMe, {state.clientinfo.name}!
            </h1>
            <img
                src={coach && coach.coachObject.coachUrl}
                alt='Current Coach'
            />

            <div className='header2'>
                <h1>{coach && coach.coachObject.coachName}</h1>
                <p>{translate('coachIntro')}</p>
            </div>

            <p className='footerText'>
                {coach && coach.coachObject.coachName}{' '}
                {translate('welcomeMessage')}
            </p>

            <button
                className='nextBtn'
                onClick={() => {
                    props.history.push('/metrics');
                }}
            >
                {translate('continueBtn')}
            </button>
        </div>
    );
};

export default WelcomeScreen;
