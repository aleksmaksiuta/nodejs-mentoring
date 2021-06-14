const { Sequelize } = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.dbConnectionUrl);
const argv = process.argv.slice(2);
const useForceClean = argv.includes('--db-clean');

const PERMISSIONS = require('../constants/permissions');
const UserModel = require( './user');
const GroupModel = require( './group');
const UserGroupModel = require( './userGroup');

const User = sequelize.define('Users', UserModel);
const Group = sequelize.define('Groups', GroupModel);
const UserGroup = sequelize.define('UserGroup', UserGroupModel, { timestamps: false, tableName: 'UserGroup' });
User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

const sync = async () => {
  await sequelize.sync({ force: true });
  console.log('Connection has been synced successfully.');
};

const initUsers = async () => {
  await User.bulkCreate([
    {
      login: 'tom.hanks',
      password: '123abc',
      age: 30,
      isDeleted: false,
    },
    {
      login: 'tom.cruz',
      password: '123bbb',
      age: 32,
      isDeleted: false,
    },
  ]);

  console.log('Users has been inited successfully.');
};

const initGroups = async () => {
  await Group.bulkCreate([
    {
      name: 'root',
      permissions: PERMISSIONS,
    }
  ]);

  console.log('Groups has been inited successfully.');
};

(async () => {
  try {
    if (useForceClean) {
      await sync();
      await initUsers();
      await initGroups();
    }

    await sequelize.close();
    console.log('Connection has been closed successfully.');

    process.exit();
  } catch (error) {
    console.error('Error:', error);
  }
})();
