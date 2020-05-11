import React, { useReducer} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_FILTER,
    CLEAR_CONTACTS,
    FILTER_CONTACTS,
    CONTACT_ERROR
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }
    
    const [ state, dispatch ] = useReducer(ContactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        // contact.id = uuidv4();

        try {
            const res = await axios.get('/api/contacts')
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })  
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    // Add Contact
    const addContact = async contact => {
        // contact.id = uuidv4();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })  
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    // Delete Contact
    const deleteContact = async id => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`)
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })      
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
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
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                clearContacts,
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
