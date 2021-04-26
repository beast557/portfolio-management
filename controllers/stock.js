const Stock = require('../models/Stock')

exports.create_stock = async(req,res,next) =>{
    const {
        full_name,short_name,total_units,
        total_investment, sold_amount,
        current_amount,overall_profit
    } = req.body;

    try{
        let newStock = {
            full_name,short_name,total_units,
            total_investment, sold_amount,
            current_amount,overall_profit
        }
       await Stock.create(newStock);
        res.status(200).send({
            msg:[{msg:"Order List added"}]
        })
    }catch(err){
        console.error(err.message);
        res.status(400).send({ errors: [{ msg: "Server error" }]});
  
    }
}

exports.show_all_stocks_details = async(req,res,next)=>{
    try{
        let stock = await Stock.findAll();
        res.status(200).send(stock);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');        
    }
}
exports.show_stock_name_only = async(req,res,next)=>{
    try{
        let stock = await Stock.findAll({
            attributes:['id','short_name']
        });
        res.status(200).send(stock);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');        
    }
}


exports.show_stock = async(req,res,next)=>{
    const {stockId} = req.params;
    try{
        let stock = await Stock.findOne({
            where:{
              id:stockId
            }
          });

        res.status(200).send(stock);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');        
    }
}

exports.delete_stock = async(req,res,next) =>{
    //stock delete
    const {id} = req.user;
    const {stockId} = req.params
    
    try {
      let stock = await Post.destroy({where:{
          id:stockId
      }})
      if(stock){

        res.status(202).send({ msg: [{ msg: "Stock deleted successfully" }]})
      }else{
        res.status(400).send({ errors: [{ msg: "An error occured" }]});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error'); 
    }
  
}