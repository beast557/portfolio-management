const Stock = require('../models/Stock')
const Sequelize = require('sequelize');

exports.show_dashboard = async(req,res,next)=>{
    try{
       let stock = await Stock.findAll({ 
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('total_investment')), 'total_investment'],
                [Sequelize.fn('sum', Sequelize.col('total_units')), 'total_units'],
                [Sequelize.fn('sum', Sequelize.col('sold_amount')), 'sold_amount'],
                [Sequelize.fn('sum', Sequelize.col('current_amount')), 'current_amount'],
                [Sequelize.fn('sum', Sequelize.col('overall_profit')), 'overall_profit']
       ]
          })

          res.status(200).send(stock)

    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');        
    }
}