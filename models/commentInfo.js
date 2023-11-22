const { DataTypes } = require('sequelize');
const db = require('../config/database');
const ProductInfo = require('./productInfo');
const UserInfo = require('./userInfo');

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
            key: 'id',
        },
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    like_cnt: {
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

CommentInfo.belongsTo(UserInfo, { foreignKey: 'user_id' });

module.exports = CommentInfo;
