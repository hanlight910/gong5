const { DataTypes }  = require('sequelize');
const db = require('../config/database');
const Auth = require("./userModel");
const User = db.define('Product', {
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    content : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'FOR_SALE',
    },
    createtime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatetime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    delivery: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    good: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    watched: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = Product;
