const PERMISSIONS = require('../constants/permissions');
const { DataTypes } = require('sequelize');

module.exports = {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM(PERMISSIONS)),
        allowNull: false,
    },
};
