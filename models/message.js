const { DataTypes } = require('sequelize');
const db = require('../config/database');
const UserInfo = require('./userInfo');

const Message = db.define('message', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
    tableName: 'message',
    timestamps: false,
});

Message.belongsTo(UserInfo, { foreignKey: 'send_user', as: 'sender' });
Message.belongsTo(UserInfo, { foreignKey: 'get_user', as: 'receiver' });

module.exports = Message;
