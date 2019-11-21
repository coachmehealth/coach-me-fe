import React from 'react';

import { Route, Redirect } from 'react-router';

const PrivateCoachRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem('token')) {
                    return <Component {...props} />;
                }
                return <Redirect to='/register' />;
            }}
        />
    );
};

export default PrivateCoachRoute;
