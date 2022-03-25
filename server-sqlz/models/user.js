// SEQUELIZE MODEL
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here:
            models.User.hasMany(models.Post, { onDelete: "cascade", hooks: true }); // 1 User can have many posts
            // models.User.hasMany(models.Comment, { onDelete: "cascade", hooks: true }); // 1 User can have many comments
            // models.User.hasMany(models.Like, { onDelete: "cascade", hooks: true });// 1 User can have many likes
            // cascade in onDelete helps to delete all associations automatically instead of writing manually in CRUD;
        }
    }
    User.init(
        {
            googleId: DataTypes.STRING,
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            bio: DataTypes.TEXT,
            isAdmin: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};


/** MONGODB MODEL */
/**
 const mongoose = require("mongoose");
 const uniqueValidator = require('mongoose-unique-validator');

 const userSchema = mongoose.Schema({
     id: { type: String},
     googleId: { type: String },
     email: { type: String, required: true, unique: true},
     name: { type: String, required: true },
     password: { type: String, required: true},
    avatar: String,
    bio: String,
    isAdmin: Boolean
})

userSchema.plugin(uniqueValidator);

 // export default mongoose.model("User", userSchema)
module.exports = mongoose.model("User", userSchema);
 */
