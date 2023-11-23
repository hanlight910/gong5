// models/index.js

const sequelize = require('../config/database');
const User = require('./userInfo');
const Message = require('./message');

sequelize.sync()
  .then(() => {
    console.log('데이터베이스 동기화 완료');
  })
  .catch((error) => {
    console.error('데이터베이스 동기화 오류:', error);
  });

