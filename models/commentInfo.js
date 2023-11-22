// commentInfo.js

const { DataTypes } = require('sequelize');
const db = require('../config/database');
const ProductInfo = require('./productInfo'); // Importing the ProductInfo model for the foreign key relationship
const UserInfo = require('./userInfo'); // Importing the UserInfo model for the foreign key relationship

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
    timestamps: false, // If you don't want Sequelize to manage timestamps
});

// Define the foreign key relationships
CommentInfo.belongsTo(ProductInfo, { foreignKey: 'product_id' });
CommentInfo.belongsTo(UserInfo, { foreignKey: 'user_id' });

module.exports = CommentInfo;
