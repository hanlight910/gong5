const { DataTypes } = require('sequelize');
const db = require('../config/database');
const ProductInfo = require('./productInfo');
const UserInfo = require('./userInfo');
const CommentLike = require('./commentLike'); // 수정: commentLike로 변경

const CommentInfo = db.define('comment_info', {
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
            key: 'id', // 수정: 'user_info'가 아닌 UserInfo로 변경
        },
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    tableName: 'comment_info',
    timestamps: false,
});

CommentInfo.belongsTo(UserInfo, { foreignKey: 'user_id', targetKey: 'id' });

CommentInfo.hasMany(CommentLike, { foreignKey: 'comment_id' });

module.exports = CommentInfo;
