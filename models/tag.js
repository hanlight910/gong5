const { DataTypes } = require('sequelize');
const db = require('../config/database');
const ProductInfo = require('./productInfo');

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
}, {
    tableName: 'tag',
    timestamps: true,
});
Tag.belongsTo(ProductInfo, { foreignKey: 'product_id' });

module.exports = Tag;
