const { DataTypes } = require('sequelize');
const db = require('../config/database');
const UserInfo = db.define('user_info', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birthday: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '$2b$10$5f3ismId7HJ3eU2IOdtm3OWaKlFK4P.product_image/1701034685528_pngtree-beautiful-profile-line-vector-icon-png-image_1990469-1.jpg'
    },
    introduction: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'user_info',
    timestamps: true,
});

module.exports = UserInfo;
