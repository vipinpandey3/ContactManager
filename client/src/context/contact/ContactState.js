import React, { useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_FILTER,
    FILTER_CONTACTS
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Vipin Pandey',
                email: 'vipinpandey@gmail.com',
                phone: '1234567890',
                type: 'personal'
            },
            {
                id: 2,
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                phone: '0988765321',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Jane Doe',
                email: 'janedoe@gmail.com',
                phone: '1597346820',
                type: 'professional' 
            }
        ],
        current: null,
        filtered: null
    }
    
    const [ state, dispatch ] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuidv4();

        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
    }

    // Delete Contact
    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }

    // Set CUrrent Contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    };

    // Update COntact
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }

    // Filter Contact
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    };

    // CLear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter              
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;
