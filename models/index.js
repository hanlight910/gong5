// models/index.js

const sequelize = require('../config/database');
const User = require('./userInfo');
const Message = require('./message');

sequelize.sync()
  .then(() => {
    console.log('데이터베이스 동기화 완료');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Message.belongsTo(UserInfo, { foreignKey: 'send_user', as: 'sender' });
db.Message.belongsTo(UserInfo, { foreignKey: 'get_user', as: 'receiver' });
db.CommentInfo.belongsTo(UserInfo, { foreignKey: 'user_id', targetKey: 'id' });
db.CommentInfo.belongsTo(ProductInfo, { foreignKey: 'product_id', targetKey: 'id' });
db.CommentLike.belongsTo(UserInfo, { foreignKey: 'user_id' });
db.ProductInfo.belongsTo(UserInfo, { foreignKey: 'user_id', targetKey: 'id' });
db.Tag.belongsTo(ProductInfo, { foreignKey: 'product_id', targetKey: 'id' });
db.CommentLike.belongsTo(CommentInfo, { foreignKey: 'comment_id', targetKey: "id" });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
