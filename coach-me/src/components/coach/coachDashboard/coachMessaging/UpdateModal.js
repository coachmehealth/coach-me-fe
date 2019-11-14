import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ScheduledMessages.scss';
import { updateScheduledMessage } from '../../../../actions/coachActions';
import './updateModal.scss';

const UpdateModal = props => {
    const { show } = props;
    const state = useSelector(state => state.coach);
    const dispatch = useDispatch();
    console.log(state);

    const [schedule, setSchedule] = useState({
        patientId: ``,
        msg: ``,
        min: ``,
        hour: ``,
        dom: ``,
        month: ``,
        weekday: ``,
        ampm: ``,
        year: ``
    });

    const handleInputChange = e => {
        e.preventDefault();
        setSchedule({ ...schedule, [e.target.name]: e.target.value });
    };

    const submitUpdatedMessage = e => {
        e.preventDefault();
        dispatch(updateScheduledMessage(state.scheduledMessage.id));
    };

    return (
        <>
            <div className={`${show === false ? 'hidden' : 'show'}`}>
                <h1> hi </h1>
            </div>
            {/* <div className='message-container-modal'>
                <h1>Schedule a Message</h1>

                <form onSubmit={submitUpdatedMessage}>
                    <textarea
                        rows='4'
                        cols='50'
                        onChange={handleInputChange}
                        value={schedule.msg}
                        name='msg'
                        type='text'
                        placeholder='Type your message here'
                        required
                    ></textarea>

                    <div className='date-wrapper-modal'>
                        <h2>DATE</h2>

                        <div className='selectheader-modal'>
                            <select
                                name='month'
                                value={schedule.month}
                                onChange={handleInputChange}
                            >
                                <option value='' disabled selected>
                                    Month
                                </option>
                                <option value={'Jan'}>January</option>
                                <option value={'Feb'}>February</option>
                                <option value={'Mar'}>March</option>
                                <option value={'Apr'}>April</option>
                                <option value={'May'}>May</option>
                                <option value={'Jun'}>June</option>
                                <option value={'Jul'}>July</option>
                                <option value={'Aug'}>August</option>
                                <option value={'Sep'}>September</option>
                                <option value={'Oct'}>October</option>
                                <option value={'Nov'}>November</option>
                                <option value={'Dec'}>December</option>
                            </select>
                        </div>
                        <div className='selectheader-modal'>
                            <select
                                name='dom'
                                value={schedule.dom}
                                onChange={handleInputChange}
                            >
                                <option value='' disabled selected>
                                    Day of Month
                                </option>
                                <option value={'1'}>1</option>
                                <option value={'2'}>2</option>
                                <option value={'3'}>3</option>
                                <option value={'4'}>4</option>
                                <option value={'5'}>5</option>
                                <option value={'6'}>6</option>
                                <option value={'7'}>7</option>
                                <option value={'8'}>8</option>
                                <option value={'9'}>9</option>
                                <option value={'10'}>10</option>
                                <option value={'11'}>11</option>
                                <option value={'12'}>12</option>
                                <option value={'13'}>13</option>
                                <option value={'14'}>14</option>
                                <option value={'15'}>15</option>
                                <option value={'16'}>16</option>
                                <option value={'17'}>17</option>
                                <option value={'18'}>18</option>
                                <option value={'19'}>19</option>
                                <option value={'20'}>20</option>
                                <option value={'21'}>21</option>
                                <option value={'22'}>22</option>
                                <option value={'23'}>23</option>
                                <option value={'24'}>24</option>
                                <option value={'25'}>25</option>
                                <option value={'26'}>26</option>
                                <option value={'27'}>27</option>
                                <option value={'28'}>28</option>
                                <option value={'29'}>29</option>
                                <option value={'30'}>30</option>
                                <option value={'31'}>31</option>
                            </select>
                        </div>
                        <div className='selectheader-modal'>
                            <select
                                name='year'
                                value={schedule.year}
                                onChange={handleInputChange}
                            >
                                <option value='' disabled selected>
                                    Year
                                </option>
                                <option value={'2019'}>2019</option>
                                <option value={'2020'}>2020</option>
                                <option value={'2021'}>2021</option>
                                <option value={'2022'}>2022</option>
                                <option value={'2023'}>2023</option>
                                <option value={'2024'}>2024</option>
                                <option value={'2025'}>2025</option>
                                <option value={'2026'}>2026</option>
                                <option value={'2027'}>2027</option>
                                <option value={'2028'}>2028</option>
                                <option value={'2029'}>2029</option>
                                <option value={'2030'}>2030</option>
                                <option value={'2031'}>2031</option>
                                <option value={'2032'}>2032</option>
                                <option value={'2033'}>2033</option>
                                <option value={'2034'}>2034</option>
                                <option value={'2035'}>2035</option>
                                <option value={'2035'}>2035</option>
                                <option value={'2036'}>2036</option>
                                <option value={'2037'}>2037</option>
                                <option value={'2038'}>2038</option>
                                <option value={'2039'}>2039</option>
                                <option value={'2040'}>2040</option>
                                <option value={'2041'}>2041</option>
                                <option value={'2042'}>2042</option>
                                <option value={'2043'}>2043</option>
                                <option value={'2045'}>2045</option>
                            </select>
                        </div>
                    </div>

                    <div className='time-wrapper-modal'>
                        <h2>TIME</h2>
                        <div className='selectheader-modal'>
                            <select
                                name='hour'
                                value={schedule.hour}
                                onChange={handleInputChange}
                            >
                                <option value='' disabled selected>
                                    Hour
                                </option>
                                <option value={'1'}>1</option>
                                <option value={'2'}>2</option>
                                <option value={'3'}>3</option>
                                <option value={'4'}>4</option>
                                <option value={'5'}>5</option>
                                <option value={'6'}>6</option>
                                <option value={'7'}>7</option>
                                <option value={'8'}>8</option>
                                <option value={'9'}>9</option>
                                <option value={'10'}>10</option>
                                <option value={'11'}>11</option>
                                <option value={'12'}>12</option>
                            </select>
                        </div>

                        <div className='selectheader-modal'>
                            <select
                                name='min'
                                value={schedule.min}
                                onChange={handleInputChange}
                            >
                                <option value='' disabled selected>
                                    Minutes
                                </option>
                                <option value={'1'}>1</option>
                                <option value={'2'}>2</option>
                                <option value={'3'}>3</option>
                                <option value={'4'}>4</option>
                                <option value={'5'}>5</option>
                                <option value={'6'}>6</option>
                                <option value={'7'}>7</option>
                                <option value={'8'}>8</option>
                                <option value={'9'}>9</option>
                                <option value={'10'}>10</option>
                                <option value={'11'}>11</option>
                                <option value={'12'}>12</option>
                                <option value={'13'}>13</option>
                                <option value={'14'}>14</option>
                                <option value={'15'}>15</option>
                                <option value={'16'}>16</option>
                                <option value={'17'}>17</option>
                                <option value={'18'}>18</option>
                                <option value={'19'}>19</option>
                                <option value={'20'}>20</option>
                                <option value={'21'}>21</option>
                                <option value={'22'}>22</option>
                                <option value={'23'}>23</option>
                                <option value={'24'}>24</option>
                                <option value={'25'}>25</option>
                                <option value={'26'}>26</option>
                                <option value={'27'}>27</option>
                                <option value={'28'}>28</option>
                                <option value={'29'}>29</option>
                                <option value={'30'}>30</option>
                                <option value={'31'}>31</option>
                                <option value={'32'}>32</option>
                                <option value={'33'}>33</option>
                                <option value={'34'}>34</option>
                                <option value={'35'}>35</option>
                                <option value={'36'}>36</option>
                                <option value={'37'}>37</option>
                                <option value={'38'}>38</option>
                                <option value={'39'}>39</option>
                                <option value={'40'}>40</option>
                                <option value={'41'}>41</option>
                                <option value={'42'}>42</option>
                                <option value={'43'}>43</option>
                                <option value={'44'}>44</option>
                                <option value={'45'}>45</option>
                                <option value={'46'}>46</option>
                                <option value={'47'}>47</option>
                                <option value={'48'}>48</option>
                                <option value={'49'}>49</option>
                                <option value={'50'}>50</option>
                                <option value={'51'}>51</option>
                                <option value={'52'}>52</option>
                                <option value={'53'}>53</option>
                                <option value={'54'}>54</option>
                                <option value={'55'}>55</option>
                                <option value={'56'}>56</option>
                                <option value={'57'}>57</option>
                                <option value={'58'}>58</option>
                                <option value={'59'}>59</option>
                                <option value={'60'}>60</option>
                            </select>
                        </div>

                        <div className='selectheader-modal'>
                            <select
                                name='ampm'
                                value={schedule.ampm}
                                onChange={handleInputChange}
                            >
                                <option value='' disabled selected>
                                    AM/PM
                                </option>
                                <option value={'AM'}>AM</option>
                                <option value={'PM'}>PM</option>
                            </select>
                        </div>
                    </div>

                    <button>Submit</button>
                </form>
            </div> */}
        </>
    );
};
export default UpdateModal;
