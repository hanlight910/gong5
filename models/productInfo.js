const { DataTypes } = require('sequelize');
const db = require('../config/database');
const UserInfo = require('./userInfo');
const CommentInfo = require('./commentInfo');

const ProductInfo = db.define('product_info', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
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
    like: {
        type: DataTypes.INTEGER,
        allowNull: false,
         defaultValue: 0,
    },
    watched: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'product_info',
    timestamps: false,
});

ProductInfo.belongsTo(UserInfo, { foreignKey: 'user_id' });
ProductInfo.hasMany(CommentInfo, { foreignKey: 'product_id' });

module.exports = ProductInfo;
