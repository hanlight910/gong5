const { DataTypes } = require('sequelize');
const db = require('../config/database');
const UserInfo = require('./userInfo');
const ProductInfo = require('./productInfo');

const Message = db.define('message', {
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
    send_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'id',
        },
    },
    get_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'id',
        },
    },
    test_message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'message',
    timestamps: true,
});



module.exports = Message;
