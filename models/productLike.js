// productLike.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');
const UserInfo = require('./userInfo'); // Importing the UserInfo model for the foreign key relationship
const ProductInfo = require('./productInfo'); // Importing the ProductInfo model for the foreign key relationship

const ProductLike = db.define('product_like', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductInfo,
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'id',
        },
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
    tableName: 'product_like',
    timestamps: false, // If you don't want Sequelize to manage timestamps
});

// Define the foreign key relationships
ProductLike.belongsTo(UserInfo, { foreignKey: 'user_id' });
ProductLike.belongsTo(ProductInfo, { foreignKey: 'product_id' });

module.exports = ProductLike;
