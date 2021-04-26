const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {create_transaction,
    show_user_transaction
} = require('../../controllers/transaction')

const auth = require('../../middleware/auth') ;



router.post("/create_transaction",auth,create_transaction );
router.get("/show_user_transaction",auth,show_user_transaction);



module.exports = router;