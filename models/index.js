const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const UserInfo = require('./userInfo'); // 모델을 임포트해야 합니다.
const ProductInfo = require('./productInfo'); // 다른 필요한 모델들을 가져오세요.
const CommentInfo = require('./commentInfo'); //
const CommentLike = require('./commentLike');
const Tag = require('./tag');
// 다른 필요한 모델들을 가져오세요.

const db = {};

sequelize.sync()
  .then(() => {
    console.log('데이터베이스 동기화 완료');
  })
  .then(() => {
    const models = [
      UserInfo,
      ProductInfo,
      // 필요한 다른 모델들을 여기에 추가하세요.
    ];

    models.forEach((model) => {
      const modelName = model.name;
      db[modelName] = model;
    });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    console.log('로드된 모델들:', Object.keys(db).join(', '));
  })
  .catch((err) => {
    console.error('데이터베이스 동기화 중 오류 발생:', err);
  });

db.Message.belongsTo(UserInfo, { foreignKey: 'send_user', as: 'sender' });
db.Message.belongsTo(UserInfo, { foreignKey: 'get_user', as: 'receiver' });
db.CommentInfo.belongsTo(UserInfo, { foreignKey: 'user_id', targetKey: 'id' });
db.CommentInfo.belongsTo(ProductInfo, { foreignKey: 'product_id', targetKey: 'id' });
db.CommentLike.belongsTo(UserInfo, { foreignKey: 'user_id' });
db.ProductInfo.belongsTo(UserInfo, { foreignKey: 'user_id', targetKey: 'id' });
db.Tag.belongsTo(ProductInfo, { foreignKey: 'product_id', targetKey: 'id' });
db.CommentLike.belongsTo(CommentInfo, { foreignKey: 'comment_id', targetKey: 'id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
