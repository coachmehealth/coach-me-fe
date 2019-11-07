import React from 'react';
import { Route } from 'react-router-dom';

// Component Imports
import PrivateRoute from './PrivateRoute';
import HealthMetric from '../clients/healthMetrics/HealthMetric';
import CoachDashboard from '../coach/coachDashboard/CoachDashboard';
import ClientDashboard from '../clients/clientDashboard/ClientDashboard';
import HealthMetricForm from '../clients/healthMetricForm/HealthMetricForm';
import LoginClient from '../clients/loginClient/LoginClient';
import Welcome from '../clients/welcomeScreen/WelcomeScreen';
import CoachRegistration from '../coach/coachRegistration/coachRegistration';
import FormLogin from '../clients/loginClient/formLogin';
import LoginCoach from '../coach/loginCoach/LoginCoach';

//Styling
import '../../App.css';
import { ResetPassword } from '../coach/loginCoach/resetPassword/ResetPassword';

const Routes = props => {
    return (
        <>
            <Route
                exact
                path='/'
                render={props => <LoginClient {...props} />}
            />
            <Route
                path='/formLogin'
                render={props => <FormLogin {...props} />}
            />

            <Route
                path='/register'
                render={props => <CoachRegistration {...props} />}
            />
            <Route path='/login' component={LoginCoach} />
            <Route path='/reset/:token' component={ResetPassword} />

            <PrivateRoute path='/metrics' component={HealthMetric} />
            <PrivateRoute path='/dashboard' component={CoachDashboard} />
            <PrivateRoute
                path='/dashboard-client'
                component={ClientDashboard}
            />

            <PrivateRoute path='/metric-form' component={HealthMetricForm} />
            <PrivateRoute path='/welcome' component={Welcome} />
        </>
    );
};

export default Routes;
