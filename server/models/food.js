"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Food extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Food.belongsTo(models.User);
		}
	}
	Food.init(
		{
			title: DataTypes.STRING,
			price: DataTypes.INTEGER,
			ingredients: DataTypes.STRING,
			tag: DataTypes.STRING,
			UserId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Food",
		}
	);
	return Food;
};
