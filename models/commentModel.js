const { DataTypes }  = require('sequelize');
const db = require('../config/database');
const User = require('./userModel');
const Product = require('./productModels');

const Comment = db.define('Comment', {
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement : true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content : {
        type: DataTypes.STRING,
        allowNull: true,
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
// {
//     tableName: 'users',
//     timestamps:true
// }

Comment.belongsTo(User, { foreignKey: 'user_id' });

Comment.belongsTo(Product, { foreignKey: 'product_id'});

module.exports = Product;

s