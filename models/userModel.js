const { DataTypes }  = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement : true
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
    birthday : {
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
    createdtime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    updatetime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    profileImage: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});
// {
//     tableName: 'users',
//     timestamps:true
// }
module.exports = User;

