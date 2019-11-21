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

    const check = goods => {
        Array.from(cardlist).filter(item => {
            const name = item.firstElementChild.textContent;
            if (goods === name) {
                // console.log(item);
                item.classList.add('active1');
            }
            if (goods !== name && item.classList.length === 2) {
                item.classList.remove('active1');
            }
        });
    };

    const cardlist = document.getElementsByClassName(`client-card`);
    // console.log(cardlist);

    const handleChange = e => {
        e.preventDefault();
        setquery(e.target.value);
    };

    useEffect(() => {
        if (clientList.length > 0) {
            setClientList(clientList);
        }

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
    console.log(clientList);

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
                                console.log(client.clientName);
                                if (client.clientName) {
                                    check(client.clientName);
                                }
                                setClient(client.clientId);
                            }}
                        >
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
