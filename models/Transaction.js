const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Transaction = sequelize.define('transaction',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    transaction_type:{
        type:Sequelize.STRING,
        allowNull: false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false        
    }
});

module.exports = Transaction;