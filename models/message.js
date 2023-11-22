const { DataTypes }  = require('sequelize');
const db = require('../config/database');
const User = require('./userModel');


const Message = db.define('Message', {
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement : true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    get_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
// {
//     tableName: 'users',
//     timestamps:true
// }

Message.belongsTo(User, { foreignKey: 'user_id' });


module.exports = Message;

