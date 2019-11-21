import React from 'react';
import { withRouter } from 'react-router-dom';
import './clientCard.scss';

const ClientCard = props => {
    return (
        <div className='name-container'>
            <h1>{props.client.clientName}</h1>
        </div>
    );
};

export default withRouter(ClientCard);
