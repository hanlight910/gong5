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
    tableName: 'comment_like',
    timestamps: false,
});

CommentLike.belongsTo(UserInfo, { foreignKey: 'user_id' });
CommentLike.belongsTo(CommentInfo, { foreignKey: 'comment_id' });

module.exports = CommentLike;
