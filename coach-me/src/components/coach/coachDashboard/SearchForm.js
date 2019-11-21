import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
//Component Imports
import ClientCard from './clientsList/ClientCard';
// Styling
import '../coachDashboard/clientsList/ClientInfo/clientInfo.scss';
import magnifying from '../../utils/assets/magnifying_glass.svg';

const SearchForm = props => {
    const state = useSelector(state => state.coach);
    const clientList = state.clientRecords;
    const [ClientList, setClientList] = useState();
    const [query, setquery] = useState();
    const { setClient } = props;

    // The check function allows for the class of 'active1' to be added to the clientcard selected. If a new client is selected this function will remove the styling by looking for the name to not match and the lenth of the classlist of the equal 2.
    const check = goods => {
        Array.from(cardlist).filter(item => {
            const name = item.firstElementChild.textContent;
            if (goods === name) {
                item.classList.add('active1');
            }
            if (goods !== name && item.classList.length === 2) {
                item.classList.remove('active1');
            }
        });
    };
    //brings all items with className 'client-card' from the virtual D.O.M as an HTMLcollection. This HTMLCollection is made into an array to be filtered in the Check function above.
    const cardlist = document.getElementsByClassName(`client-card`);

    const handleChange = e => {
        e.preventDefault();
        setquery(e.target.value);
    };

    useEffect(() => {
        if (clientList.length > 0) {
            setClientList(clientList);
        }
        // query is  client name passed into the search form for the clientList to update when searching for a client.
        if (query) {
            setClientList(
                clientList.filter(client => {
                    const name = client.clientName.toLowerCase();
                    if (name.includes(query)) {
                        return client;
                    }
                })
            );
        }
    }, [query, clientList]);

    return (
        <>
            <form className='search-form'>
                <div className='input-icon'>
                    <img
                        className='magnifying-glass icon'
                        alt='magnifying-glass'
                        src={magnifying}
                    ></img>
                    <input
                        data-cy='search'
                        className='search-input'
                        onChange={handleChange}
                        placeholder='Search Client'
                        value={query}
                        name='name'
                    />
                </div>
            </form>

            <div className='scroll-list'>
                {ClientList &&
                    ClientList.map(client => (
                        <div
                            className='client-card'
                            onClick={() => {
                                if (client.clientName) {
                                    check(client.clientName);
                                }
                                setClient(client.clientId);
                            }}
                        >
                            {/* Client Card is each client in the clientList that is rendered under the search input */}
                            <ClientCard
                                key={client.clientId}
                                client={client}
                                setClient={props.setClient}
                                check={check}
                            />
                        </div>
                    ))}
            </div>
        </>
    );
};
export default SearchForm;
