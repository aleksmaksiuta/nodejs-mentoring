const {Sequelize} = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.dbConnectionUrl, {
  dialect: 'postgres',
  // logging: false,
});
const UserModel = require('./user');
const GroupModel = require('./group');
const UserGroupsModel = require('./userGroups');

const tablePostfix = config.env === 'test' ? '' : '';

const User = sequelize.define(`Users${tablePostfix}`, UserModel, {
  timestamps: false,
  freezeTableName: true,
});
const Group = sequelize.define(`Groups${tablePostfix}`, GroupModel, {
  timestamps: false,
  freezeTableName: true,
});
const UserGroups = sequelize.define(`UserGroups${tablePostfix}`, UserGroupsModel, {
  timestamps: false,
  freezeTableName: true,
});
User.belongsToMany(Group, {through: UserGroups});
Group.belongsToMany(User, {through: UserGroups});

// const sync = async () => {
//   try {
//     await sequelize.sync({ force: true });
//   } catch (error) {
//     console.error('Unable to sync the database:', error);
//   }
// };

// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };
//
// (async () => {
//   await connect();
// })();

module.exports = {
  User,
  Group,
  UserGroups,
  sequelize,
  // sync,
  // connect,
};
