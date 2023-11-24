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
db.CommentLike.belongsTo(db.CommentInfo, { foreignKey: 'comment_id' });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
