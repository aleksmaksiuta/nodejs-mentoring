const UserRepo = require('../repo/UserRepo');
const BaseError = require('../utils/BaseError');
const HttpStatusCode = require('../constants/httpStatusCodes');

const getAutoSuggestUsers = async (loginSubstring, limit) => {
  const usersFound = await UserRepo.getByLogin(loginSubstring, limit);

  return usersFound.filter(user => !user.isDeleted);
};

const getUsers = async (id) => {
  if (id) {
    const user = await UserRepo.getOne({ id });

    if (!user) {
      throw new BaseError('Not Found', HttpStatusCode.NOT_FOUND, 'User not found');
    } else {
      return user;
    }
  }

  return UserRepo.getAll();
};

const createUser = async (user) => {
  const {login, password, age} = user;

  const users = await UserRepo.getByLogin(login, 1);

  if (users.length) {
    throw new BaseError('Exists', HttpStatusCode.BAD_REQUEST, 'User already exists');
  }

  return UserRepo.create({login, password, age});
};

const updateUser = async (user) => {
  const userFound = await getUsers(user.id);

  if (!userFound) {
    throw new BaseError('Not Found', HttpStatusCode.NOT_FOUND, 'User not found');
  }

  const existingUser = UserRepo.getOne({
    login: user.login,
  });

  if (existingUser && existingUser.id !== user.id) {
    throw new BaseError('Exists', HttpStatusCode.BAD_REQUEST, 'User with this login already exists');
  }

  return UserRepo.update(user);
};

const deleteUser = (id) => getUsers(id).then(userFound => {
  if (!userFound) {
    throw new BaseError('Not Found', HttpStatusCode.NOT_FOUND, 'User not found');
  }

  return UserRepo.remove(id);
});

const softDeleteUser = (id) => getUsers(id).then(userFound => {
  if (!userFound) {
    throw new BaseError('Not Found', HttpStatusCode.NOT_FOUND, 'User not found');
  }

  return UserRepo.update({
    ...(userFound.dataValues),
    isDeleted: true,
  }, ['isDeleted']);
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  softDeleteUser,
  getAutoSuggestUsers,
};
