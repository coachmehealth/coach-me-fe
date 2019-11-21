import React, { useState } from 'react';
import './goalCard.scss';
import moment from 'moment';
import { ReactComponent as Arrow } from '../assets/Vector.svg';
import { ReactComponent as ArrowDown } from '../assets/Arrow-down.svg';
import { ReactComponent as GreenCheck } from '../assets/greenCheckMark.svg';
import { ReactComponent as RedX } from '../assets/redX.svg';

const GoalCard = props => {
    console.log('GoalCards', props);

    const [show, setShow] = useState(false);

    const toggleGoal = e => {
        setShow(!show);
    };

    let goalMet;
    let goalResponse;
    if (props.metGoal === 'Yes') {
        goalMet = <GreenCheck className='green-check' />;
        goalResponse = (
            <div className='met-goal'>
                <p>Met Goal</p>
            </div>
        );
    } else if (props.metGoal === 'No') {
        goalMet = <RedX className='red-x' />;
        goalResponse = (
            <div className='unmet-goal'>
                <p>Unmet Goal</p>
            </div>
        );
    } else {
        goalResponse = (
            <div className='in-progress'>
                <p>In Progress</p>
            </div>
        );
    }

    let notes;
    let goalNotes;
    if (props.notes !== undefined && show !== false) {
        goalNotes = props.notes;
        notes = 'Notes:';
    }
    // followUps
    let followUps;
    let followUpText;
    if (props.followups !== undefined && show !== false) {
        followUpText = props.followups;
        followUps = 'Follow Up:';
    }

    let arrow;
    if (show === false) {
        arrow = <ArrowDown />;
    } else {
        arrow = <Arrow />;
    }

    // console.log('goalNotes', goalNotes);
    return (
        <div className='goal-text-container'>
            <div className='goal-mas'>
                <div className='goalMet'>{goalMet}</div>
                {goalResponse}
            </div>
            <div className='text-container'>
                <div className='start-date'>
                    Start Date: {moment(props.startDate).format('MMM Do')}
                </div>
                <div className='goal-text'>
                    <p>{props.goal}</p>
                </div>
                <div
                    className={`goal-notes ${!show ? 'hidden' : 'not-hidden'}`}
                >
                    <p className='goal-notes-title'>{notes}</p>

                    <p>{goalNotes}</p>
                </div>
                <div className={`follow-up ${!show ? 'hidden' : 'not-hidden'}`}>
                    <p className='follow-up-title'>{followUps}</p>

                    <p>{followUpText}</p>
                </div>
            </div>
            <div className='arrow' onClick={() => toggleGoal(show)}>
                {arrow}
            </div>
        </div>
    );
};

export default GoalCard;
