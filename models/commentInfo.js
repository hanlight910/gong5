const { DataTypes } = require('sequelize');
const db = require('../config/database');
const UserInfo = require('./userInfo');
const CommentLike = require('./commentLike');

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
            model: 'product_info', // 이 부분을 수정해야 할 수 있습니다.
            key: 'id',
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserInfo,
            key: 'id',
        },
    },
}, {
    tableName: 'comment_info',
    timestamps: true,
});

CommentInfo.belongsTo(UserInfo, { foreignKey: 'user_id' });
CommentInfo.hasMany(CommentLike, { foreignKey: 'comment_id' }); // CommentInfo와 CommentLike 간의 관계를 설정합니다.

module.exports = CommentInfo;
