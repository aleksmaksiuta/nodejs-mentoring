const {Sequelize} = require('sequelize');
const config = require('../config');
const isTestEnv = config.env === 'test';
const sequelize = new Sequelize(config.dbConnectionUrl, {
  dialect: 'postgres',
  logging: isTestEnv ? false : console.log,
});
const UserModel = require('./user');
const GroupModel = require('./group');
const UserGroupsModel = require('./userGroups');

const User = sequelize.define(`Users`, UserModel, {
  timestamps: false,
  freezeTableName: true,
});
const Group = sequelize.define(`Groups`, GroupModel, {
  timestamps: false,
  freezeTableName: true,
});
const UserGroups = sequelize.define(`UserGroups`, UserGroupsModel, {
  timestamps: false,
  freezeTableName: true,
});
User.belongsToMany(Group, {through: UserGroups});
Group.belongsToMany(User, {through: UserGroups});

const sync = async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
};

const connect = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

if (!isTestEnv) {
  (async () => {
    await connect();
  })();
}

module.exports = {
  User,
  Group,
  UserGroups,
  sequelize,
  sync,
  connect,
};
