"use strict";
// INSERT of mysql. CREATE TABLE USER
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("User", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            googleId: { allowNull: true, type: Sequelize.STRING },
            email: { allowNull: false, type: Sequelize.STRING, unique: true },
            username: { allowNull: false, type: Sequelize.STRING },
            password: { allowNull: false, type: Sequelize.STRING },
            avatar: { allowNull: true, type: Sequelize.STRING },
            bio: { allowNull: true, type: Sequelize.TEXT },
            isAdmin: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false, // isAdmin = 0 which is tinyInt() type - boolean alternative
            },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });
    },
    // delete table
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("User");
    },
};
