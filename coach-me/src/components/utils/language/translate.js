import language from './languages.json';
import store from '../../../store';

//  IMPORTANT ---- this function will need to be called AFTER the GET request to airtable for clientInfo!

export const translate = words => {
    const state = store.getState();

    // DEFAULT Language Preference is set to English
    let langPref = 'English';

    // Check to see if Language Preference has been set to state from airtable and return.
    if (state.client.clientinfo.language) {
        langPref = state.client.clientinfo.language;

        return language[langPref][words];
    }

    // returns default language preference if none is set to state.
    return language[langPref][words];
};
