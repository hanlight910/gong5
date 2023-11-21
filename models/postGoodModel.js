const { DataTypes }  = require('sequelize');
const db = require('../config/database');
const Auth = require("./productModel");
const User = db.define('postGood', {
    product_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    
    createtime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatetime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = postGood;
