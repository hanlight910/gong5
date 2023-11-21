const { DataTypes }  = require('sequelize');
const db = require('../config/database');
const Auth = require("./productModel");
const User = db.define('Tag', {
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    tagcomment: {
        type: DataTypes.STRING,
        allowNull: false,
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

module.exports = Tag;
