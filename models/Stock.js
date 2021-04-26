const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Stock = sequelize.define('stock',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    full_name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    short_name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    total_units:{
        type:Sequelize.INTEGER,
        allowNull:false 
    },
    total_investment:{
        type:Sequelize.INTEGER,
        allowNull:false 
    },
    sold_amount:{
        type:Sequelize.INTEGER,
        allowNull:false 
    },
    current_amount:{
        type:Sequelize.INTEGER,
        allowNull:false 
    },
    overall_profit:{
        type:Sequelize.INTEGER,
        allowNull:false 
    }
})

module.exports = Stock;