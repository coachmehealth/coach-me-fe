import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

//Icon Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from './assets/logo.svg';

//Styling
import './loginClient.scss';

const UserPhoneNumber = props => {
    const { getinfo } = props;
    const [input, setinput] = useState({ areacode: '', dig1: '', dig2: '' });

    const handleChange = e => {
        setinput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const number = input.areacode + input.dig1 + input.dig2;
        getinfo({ num: number, history: props.history });
    };

    const moveOver = (e, item1, item2) => {
        const length = e.target.value.length;
        const maxLength = document
            .getElementById(item1)
            .getAttribute('maxLength');
        //if statement uses '==' for type coercion, please leave it
        if (length == maxLength) {
            document.getElementById(item2).focus();
        }
    };

    return (
        <div className='phonenumber-container'>
            <div className='img-container'>
                <Logo />
            </div>
            <div className='text-content'>
                <div className='header'>
                    <p className='english'>
                        Enter your phone number to get started.
                    </p>
                </div>
                <div className='subtext'>
                    <p className='spanish'>Ingrese su número teléfono</p>
                </div>
            </div>

            <div className='form-container'>
                <form
                    onSubmit={e => {
                        handleSubmit(e);
                    }}
                >
                    <div className='num-inputs'>
                        <span>(</span>
                        <input
                            data-cy='input1'
                            type='number'
                            id='txt1'
                            maxLength='3'
                            name='areacode'
                            onChange={handleChange}
                            value={input.areacode}
                            pattern='[0-9]*'
                            ng-model='vm.onlyNumbers'
                            min='0'
                            onInput={e => {
                                moveOver(e, 'txt1', 'txt2');
                            }}
                        />

                        <span>)</span>
                        <input
                            data-cy='input2'
                            type='number'
                            id='txt2'
                            maxlength='3'
                            name='dig1'
                            onChange={handleChange}
                            value={input.dig1}
                            pattern='[0-9]*'
                            ng-model='vm.onlyNumbers'
                            min='0'
                            onInput={e => {
                                moveOver(e, 'txt2', 'txt3');
                            }}
                        />
                        <span>-</span>
                        <input
                            data-cy='input3'
                            type='number'
                            maxlength='4'
                            id='txt3'
                            // max='9999'
                            name='dig2'
                            onChange={handleChange}
                            value={input.dig2}
                            pattern='[0-9]*'
                            ng-model='vm.onlyNumbers'
                            // min='0'
                        />
                    </div>
                    <button className='trigger' type='submit'>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(UserPhoneNumber);
