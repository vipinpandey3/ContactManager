const express = require('express');
const router = express.Router();

// @route  Get api/contacts
// @desc Get all user's Contact
// @access private 
router.get('/', (req, res) => {
    res.send('Get All contacts')
});

// @route  Post api/contacts
// @desc Add new Contacts
// @access private 
router.post('/', (req, res) => {
    res.send('Add Contact')
});

// @route  PUT api/contacts/:id
// @desc Update Contacts
// @access private 
router.put('/:id', (req, res) => {
    res.send('Update Contact')
});

// @route  DELETE api/contacts/:id
// @desc Delete Contacts
// @access private 
router.delete('/:id', (req, res) => {
    res.send('Delete Contact')
});

module.exports = router;