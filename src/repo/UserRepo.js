const {Op} = require('sequelize');
const {User} = require('../models/index');

const getOne = (params = {}) => User.findOne({
  where: params,
});

const getAll = () => User.findAll();

const getByLogin = (loginSubstring, limit = 50) => User.findAll({
  where: {
    login: {
      [Op.substring]: loginSubstring,
    },
  },
  order: [
    ['login', 'ASC'],
  ],
  limit,
});

const update = (user, fields = []) => User.update(user, {
  where: {id: user.id},
  fields: fields.length ? fields : Object.keys(user),
});

const create = (user) => User.create(user);

const remove = (id) => User.destroy({
  where: {id},
});

module.exports = {
  getOne,
  getAll,
  update,
  create,
  remove,
  getByLogin,
};
