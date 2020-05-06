const express = require('express');
const router = express.Router();

// @route  get api/auth
// @desc get Logged in user
// @access Private 
router.get('/', (req, res) => {
    res.send('Get Logged in User')
});

// @route  POST api/auth
// @desc Auth user and Get token
// @access Public 
router.post('/', (req, res) => {
    res.send('Login User')
});


module.exports = router;