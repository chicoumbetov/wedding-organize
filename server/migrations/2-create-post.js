"use strict";
// INSERT of mysql. CREATE TABLE POST
module.exports = {
    up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable(
                "Post",
                {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                    },
                    userId: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                        references: {
                            // link Comment to User by id
                            model: 'User',
                            key: 'id'
                        }
                    },
                    title: { allowNull: false, type: Sequelize.STRING },
                    message: { allowNull: false, type: Sequelize.STRING },
                    name: { allowNull: false, type: Sequelize.STRING },
                    creator: { allowNull: false, type: Sequelize.STRING },
                    tags: { allowNull: false, type: Sequelize.STRING },
                    selectedFile: { allowNull: false, type: Sequelize.STRING },
                    // likes: { allowNull: false, type: Sequelize.STRING },
                    // comments: { allowNull: false, type: Sequelize.STRING },
                    createdAt: { allowNull: false, type: Sequelize.DATE },
                    updatedAt: { allowNull: false, type: Sequelize.DATE },
                }
            )
    },
    // delete table
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Post");
    },
}
