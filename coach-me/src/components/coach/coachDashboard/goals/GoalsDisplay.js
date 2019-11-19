import React, { useState, useEffect } from 'react';
// redux hooks
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../../../../actions/coachActions';
import GoalDisplayModal from './GoalDisplayModal';
import GoalCard from './GoalCard';
import './goalsDisplay.scss';

const GoalsDisplay = props => {
    // accessing all the the state from the coach reducer
    const state = useSelector(state => state.coach);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const { clientprofile } = props;

    // checking to see if the client profile and Id exist and if they do execute the getGoals action from passing in the client id, if client profile is changed the dependency will re render component to reflect new client profile.
    useEffect(() => {
        if (clientprofile && clientprofile.clientId) {
            dispatch(getGoals(clientprofile.clientId));
        }
    }, [clientprofile]);

    // toggle boolean in local state to open and close the Modal
    const toggleModal = e => {
        setShow(!show);
    };

    return (
        <div className='goals-wrapper'>
            <div className='label'>
                <label>Goals</label>
                <button
                    className='goals-wrapper-button'
                    onClick={() => toggleModal()}
                >
                    View all
                </button>
            </div>
            {state.clientGoals
                .filter(x => x.goal !== undefined)
                .map((goal, i) => (
                    <div className='goal-wrapper-box'>
                        <GoalCard
                            key={i}
                            goal={goal.goal}
                            startDate={goal.startDate}
                            goalDetails={goal.goalDetails}
                            metGoal={goal.metGoal}
                            notes={goal.notes}
                            followups={goal.followups}
                        />
                    </div>
                ))}
            <GoalDisplayModal
                toggleModal={toggleModal}
                goals={state.clientGoals}
                show={show}
            />
        </div>
    );
};

export default GoalsDisplay;
