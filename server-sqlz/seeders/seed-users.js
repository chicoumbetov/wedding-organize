"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         * name: 'John Doe',
         * isBetaMember: false
         * }], {});
         */
        return queryInterface.bulkInsert("User", [
            {
                id: "1", username: "Admin", email: "admin@gmail.com", // replace
                password:
                    "$2b$10$Q.WiejLNsoDTWxm.9Z77C.zF36NELnpkwDcl87SZO3QZewHpff9ky", // replace
                avatar: "http://localhost:3000/images/avatar1.png", isAdmin: true,
                bio: "Administrateur de Groupomania", createdAt: new Date(), updatedAt: new Date(),
            },
            {
                id: "2", username: "John", email: "john@gmail.com",
                password:
                    "$2b$10$Q.WiejLNsoDTWxm.9Z77C.zF36NELnpkwDcl87SZO3QZewHpff9ky",
                avatar: "http://localhost:3000/images/avatar3.png",
                isAdmin: false, bio: "Veuillez compléter votre profil...",
                createdAt: new Date(), updatedAt: new Date(),
            },
            {
                id: 3,
                // googleId: "106441773862728480468",
                email: "shyngysmaaan@gmail.com",
                username: "Shy U",
                password:"$2a$12$7D9enKxvriPxI8Ue5LfG/uHj9.ZEh0mQ3tU6jC4CE4MNDog85P5f6",
                avatar: "",
                bio: "Bio",
                isAdmin: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    // delete all informations from table "User"
    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete("User", null, {});
    },
};
