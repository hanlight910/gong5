const { DataTypes } = require('sequelize');
const db = require('../config/database');
const CommentInfo = require('./commentInfo');
const UserInfo = require('./userInfo');

const CommentLike = db.define('comment_like', {
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
            model: 'comment_info',
            key: 'id',
        },
    },
}, {
    tableName: 'comment_like',
    timestamps: true,
});

CommentLike.belongsTo(UserInfo, { foreignKey: 'user_id' });

module.exports = CommentLike;
