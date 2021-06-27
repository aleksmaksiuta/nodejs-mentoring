const {DataTypes} = require('sequelize');
const User = require('./user');
const Group = require('./group');

module.exports = {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  GroupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
};
