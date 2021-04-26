const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {   
    show_dashboard
} = require('../../controllers/dashboard')

const auth = require('../../middleware/auth') 



router.get("/showdashboard",show_dashboard);

module.exports = router;