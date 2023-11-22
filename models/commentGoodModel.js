const { DataTypes }  = require('sequelize');
const db = require('../config/database');
const Product = require('./productModels');
const Comment = require('./commentModel');

const CommentGood = db.define('CommentGood', {
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement : true
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
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
// {
//     tableName: 'users',
//     timestamps:true
// }

CommentGood.belongsTo(Comment, { foreignKey: 'comment_id' });

CommentGood.belongstTo(Product, { foreignKey: 'product_id'});

module.exports = Product;

