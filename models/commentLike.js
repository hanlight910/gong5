const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CommentInfo = require('./commentInfo')
const UserInfo = require('./userInfo');
 
const CommentLike = sequelize.define('commentLike', {
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
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CommentInfo,
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
    tableName: 'commentLike',
    timestamps: false,
});



module.exports = CommentLike;
