const GroupRepo = require('../repo/GroupRepo');
const BaseError = require('../utils/BaseError');
const HttpStatusCode = require('../constants/httpStatusCodes');

const getGroups = (id) => {
  if (id) {
    return GroupRepo.getOne({ id });
  }

  return GroupRepo.getAll();
};

const createGroup = async (group) => {
  const {name, permissions} = group;

  const groupFound = await GroupRepo.getAll({
    name,
  });

  if (groupFound.length) {
    throw new BaseError('Exists', HttpStatusCode.BAD_REQUEST, 'Group already exists');
  }

  return GroupRepo.create({name, permissions});
};

const updateGroup = async (group) => {
  const groupFound = await getGroups(group.id);

  if (!groupFound) {
    throw new BaseError('Not Found', HttpStatusCode.NOT_FOUND, 'Group not found');
  }

  const existingGroup = await GroupRepo.getOne({
    name: group.name,
  });

  if (existingGroup && existingGroup.id !== group.id) {
    return Promise.reject('Exists');
  }

  return GroupRepo.update(group);
}

const deleteGroup = (id) => getGroups(id).then(groupFound => {
  if (!groupFound) {
    throw new BaseError('Not Found', HttpStatusCode.NOT_FOUND, 'Group not found');
  }

  return GroupRepo.remove(id);
});

const addUsersToGroup = (groupId, userIds) => GroupRepo.addUsersToGroup(groupId, userIds);

module.exports = {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  addUsersToGroup,
};
