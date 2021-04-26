const express = require('express');
const app = express();


const sequelize = require('./config/database');
require('dotenv').config()


const userAuth = require('./routes/v1/auth');
const stock = require('./routes/v1/stock');
const transaction = require('./routes/v1/transaction');
const dashboard = require('./routes/v1/dashboard');

//middlewares
app.use(express.json({ extended: false }));
app.use('/api/v1/user', userAuth);
app.use('/api/v1/stock',stock);
app.use('/api/v1/transaction',transaction);
app.use('/api/v1/dashboard',dashboard);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const PORT = process.env.PORT || 5000;

/*calling / including all database */
const User  = require('./models/User')

const Transaction = require('./models/Transaction');
const Stock = require('./models/Stock');

/* showing relationship*/

User.hasMany(Transaction,{
  constraints:true,
  onDelete:'CASCADE'
})
Transaction.belongsTo(User);

Stock.hasMany(Transaction,{
  constraints:true,
  onDelete:'CASCADE'
})
Transaction.belongsTo(Stock);

sequelize
  .sync({
    // force:true
  })
  .then(result => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));    
  })
  .catch(err => {
    console.log(err);
  });