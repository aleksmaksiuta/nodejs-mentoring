const Sequelize = require('sequelize');
const {UserGroups, sequelize} = require('../models/index');
const {Group} = require('../models/index');

const getOne = (params = {}) => Group.findOne({
  where: params,
});

const getAll = (searchParams) => Group.findAll({
  where: searchParams,
});

const update = (user, fields = []) => Group.update(user, {
  where: {id: user.id},
  fields: fields.length ? fields : Object.keys(user),
});

const create = (user) => Group.create(user);

const remove = (id) => Group.destroy({
  where: {id},
});

const addUsersToGroup = async (groupId, userIds) => sequelize.transaction(
  {isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE},
  transaction => Promise.all(
    userIds.map((userId) => UserGroups.create({
      UserId: userId,
      GroupId: groupId,
    }, { transaction })),
  ),
);

module.exports = {
  getOne,
  getAll,
  update,
  create,
  remove,
  addUsersToGroup,
};
