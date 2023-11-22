// productInfo.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');
const UserInfo = require('./userInfo'); // Importing the UserInfo model for the foreign key relationship

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
    good: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    watched: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    timestamps: false, // If you don't want Sequelize to manage timestamps
});

// Define the foreign key relationship
ProductInfo.belongsTo(UserInfo, { foreignKey: 'user_id' });

module.exports = ProductInfo;
