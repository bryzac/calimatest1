const express = require('express');
const upload = require({ dest: '../img/storage'});
const { profileDetailsRouter } = require('../controllers/profileDetails');
const api = express.Router();


api.post('/api/users/profileDetails', upload.single('imageprofile'), profileDetailsRouter);
module.exports = api;