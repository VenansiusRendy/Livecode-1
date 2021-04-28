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
			title: {
				type: DataTypes.STRING,
				notNull: true,
				validate: {
					notEmpty: {
						args: true,
						msg: "Title caanot be empty",
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				notNull: true,
				validate: {
					notEmpty: {
						args: true,
						msg: "Title caanot be empty",
					},
				},
			},
			ingredients: {
				type: DataTypes.STRING,
				notNull: true,
				validate: {
					notEmpty: {
						args: true,
						msg: "Title caanot be empty",
					},
				},
			},
			tag: {
				type: DataTypes.STRING,
				notNull: true,
				validate: {
					notEmpty: {
						args: true,
						msg: "Title caanot be empty",
					},
				},
			},
			UserId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Food",
		}
	);
	return Food;
};
