// tag.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');
const ProductInfo = require('./productInfo'); // Importing the ProductInfo model for the foreign key relationship

const Tag = db.define('tag', {
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
    tag_text: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'tag',
    timestamps: false, // If you don't want Sequelize to manage timestamps
});

// Define the foreign key relationship
Tag.belongsTo(ProductInfo, { foreignKey: 'product_id' });

module.exports = Tag;
