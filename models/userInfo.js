const { DataTypes } = require('sequelize');
const db = require('../config/database');
const CommentInfo = require('./commentInfo');
const ProductInfo = require('./productInfo');
const CommentLike = require('./commentLike');
const Message = require('./message');





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
        allowNull: true,
    },
}, {
    tableName: 'user_info',
    timestamps: true,
});

UserInfo.hasMany(CommentInfo, { foreignKey: 'user_id' });
UserInfo.hasMany(ProductInfo, { foreignKey: 'user_id' });
UserInfo.hasMany(CommentLike, { foreignKey: 'user_id' });
UserInfo.hasMany(Message, { foreignKey: 'user_id' });


module.exports = UserInfo;
