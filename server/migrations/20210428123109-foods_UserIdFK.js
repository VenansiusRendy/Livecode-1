"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.addConstraint("Food", {
			fields: ["UserId"],
			type: "foreign key",
			name: "foods_UserId_FK",
			references: {
				//Required field
				table: "Users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.removeConstraint("Food", "foods_UserId_FK");
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
