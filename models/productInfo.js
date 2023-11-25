const { DataTypes, ENUM } = require('sequelize');
const db = require('../config/database');
const UserInfo = require('./userInfo');


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
        type: DataTypes.ENUM("판매중", "판매완료"),
        allowNull: false,
        defaultValue: "판매중"
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
}, {
    tableName: 'product_info',
    timestamps: true,
});

ProductInfo.belongsTo(UserInfo, { foreignKey: 'user_id' });

module.exports = ProductInfo;
