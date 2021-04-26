const express = require('express');
const router = express.Router();

const {check } = require('express-validator')


const {create_stock,
    show_all_stocks_details,
    show_stock,
    show_stock_name_only    

} = require('../../controllers/stock')
const auth = require('../../middleware/auth') 


router.post("/create_stock", create_stock);

router.get("/show_stock/:stockId",show_stock);
router.get("/show_stock_name_only",show_stock_name_only);

router.get("/show_stocks",show_all_stocks_details);

module.exports = router;