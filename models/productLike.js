const { DataTypes } = require('sequelize');
const db = require('../config/database');
const UserInfo = require('./userInfo');
const ProductInfo = require('./productInfo');

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
}, {
    tableName: 'product_like',
    timestamps: true,
});
ProductLike.belongsTo(UserInfo, { foreignKey: 'user_id' });
ProductLike.belongsTo(ProductInfo, { foreignKey: 'product_id' });
module.exports = ProductLike;
