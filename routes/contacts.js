const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route  Get api/contacts
// @desc Get all user's Contact
// @access private 
router.get('/', 
    auth, 
    async (req, res) => {
        try {
            const contacts = await Contact.find({ user: req.user.id}).sort({ date: -1 });
            res.json(contacts);
        } catch (err) {
            console.error(err.message);
            res.status(500). send('Server Error');
        }
    }
);

// @route  Post api/contacts
// @desc Add new Contacts
// @access private 
router.post('/', 
    [
        auth, 
        [
            check('name', 'Name is Required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }

        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name, 
                email, 
                phone, 
                type, 
                user: req.user.id
            });

            const contact = await newContact.save();

            res.json(contact);
        } catch (er) {
            console.error(er.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route  PUT api/contacts/:id
// @desc Update Contacts
// @access private 
router.put(
    '/:id', 
    auth, 
    async (req, res) => {
        const { name, email, phone, type } = req.body;

        // Build COntact Object
        const contactFields = {}

        if(name) {
            contactFields.name = name;
        }

        if(email) {
            contactFields.email = email;
        }

        if(phone) {
            contactFields.phone = phone;
        }

        if(type) {
            contactFields.type = type;
        }

        try {
            let contact = await Contact.findById(req.params.id)

            if(!contact) {
                return res.status(404).json({msg: 'Contact not found' })
            }

        // Make sure User Owns Contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorised' });
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            {
                $set: contactFields
            },
            {
                new: true
            }
        );

        res.json(contact)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route  DELETE api/contacts/:id
// @desc Delete Contacts
// @access private 
router.delete('/:id', auth,  async (req, res) => {

    try {
        let contact = await Contact.findById(req.params.id)

        if(!contact) {
            return res.status(404).json({msg: 'Contact not found' })
        }

    // Make sure User Owns Contact
    if(contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorised' });
    }

    await Contact.findByIdAndRemove(req.params.id)

    res.json({msg: 'Contact Removed'})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;