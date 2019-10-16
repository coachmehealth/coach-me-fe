import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientInfo = ({ match }) => {
  const [clientInfo, setClientInfo] = useState();

  console.log('match', match.params.clientid);

  useEffect(() => {
    // Get request to airtable endpoint with api key appended to the end of url
    axios
      .get(
        `https://api.airtable.com/v0/app3X8S0GqsEzH9iW/Check-ins/${match.params.clientid}?api_key=keyfahybUIpBkegFv`
      )
      .then(res => setClientInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(clientInfo);

  return (
    <div>
      <h1>{clientInfo && clientInfo.fields.Name}</h1>
      <p>Last Check In: {clientInfo && clientInfo.fields['Last check-in']}</p>
    </div>
  );
};

export default ClientInfo;