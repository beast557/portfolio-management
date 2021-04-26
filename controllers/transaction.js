const Transaction = require('../models/Transaction')
const Stock = require("../models/Stock")

exports.create_transaction = async(req,res,next) =>{
    const {
        transaction_type,
        quantity,
        price,
        stockId
    } = req.body;

    const userId = req.user.id;
    try{
        let newTransaction = {
            transaction_type,
            quantity,
            price,
            stockId,
            userId
        }

        await Transaction.create(newTransaction);
        res.status(200).send({
            msg:[{msg:"Transaction added to the order list"}]
        })
    }catch(err){
        console.error(err.message);
        res.status(400).send({ errors: [{ msg: "Server error" }]});
  
    }
}

exports.show_user_transaction = async(req,res,next)=>{
    userId = req.user.id
    try{
        const transactions = await Transaction.findAll({
            where:{
                userId
              },
              order: [
                ['id', 'DESC']
            ],
            include:{
                model:Stock,
                attributes:['full_name','short_name']
            }}
        )
        res.status(200).send(transactions);
    }catch(err){
        console.error(err.message);
        res.status(400).send({ errors: [{ msg: "Server error" }]});
  
    }
}