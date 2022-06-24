/**
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
         // Helper method for defining associations.
         // This method is not a part of Sequelize lifecycle.
         // The `models/index` file will call this method automatically.

        static associate(models) {
            // define association here
            // many to one
            models.Post.belongsTo(models.User); // Post linked to one user
            // one to many
            models.Post.hasMany(models.Comment, { onDelete: "cascade", hooks: true}); // one post can have manycomments
            models.Post.hasMany(models.Like, { onDelete: "cascade", hooks: true });
            // many to many;
            // The simplest way to define the Many-to-Many relationship is:
            // User.belongsToMany
        }
    }
    Post.init(
        {
            title: DataTypes.STRING,
            content: DataTypes.TEXT,
            attachment: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
*/

/**   MONGO DB Model */
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: { type: Date, default: new Date() }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

module.exports = PostMessage
