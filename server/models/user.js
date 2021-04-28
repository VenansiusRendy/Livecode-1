"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Food);
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			hooks: {
				beforeCreate(user) {
					const salt = bcrypt.genSaltSync(10);
					const hash = bcrypt.hashSync(user.password, salt);
					user.password = hash;
					return user;
				},
			},
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
