const {Sequelize} = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.dbConnectionUrl);
const UserModel = require('./user');
const GroupModel = require('./group');
const UserGroupModel = require('./userGroup');

const User = sequelize.define('Users', UserModel);
const Group = sequelize.define('Groups', GroupModel);
const UserGroup = sequelize.define('UserGroup', UserGroupModel, {timestamps: false, tableName: 'UserGroup'});
User.belongsToMany(Group, {through: UserGroup});
Group.belongsToMany(User, {through: UserGroup});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = {
  User,
  Group,
  UserGroup,
  sequelize,
};
