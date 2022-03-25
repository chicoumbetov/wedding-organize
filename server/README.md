// Backend

// for checking on openclassroom examinator
2Link tables
   create files in models folder where cascade deletion is managed;

---
npx sequelize-cli db:create // create database according on config.json
"database": "database_groupomania",
---
4) In migrations folder stock file per table;

create & write file in migrations for each table which is model of table.

___
P.S. possible to generate models & migrations files with command:
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
___
5) npx sequelize-cli db:migrate 
to execute migrations files that will create all tables in mysql database workbench

https://sequelize.org/v6/manual/migrations.html

6) npx sequelize-cli db:seed
to execute seed files that will fill information in all table that were created on step 4;

7) Generate automatically seed files to fill all created tables in the previous step;
npx sequelize-cli seed:generate --name post

8) fill key value pairs.
then execute with command:
npx sequelize-cli db:seed

9) Create one user & one post; 
10) Link post to user; 
11) Delete User to test "cascade" that should delete linked post;
12) Create likes comments dislike tables. Link them to post
    id_user in comment; id_post in comment
13) Create 3 more tables: comments, likes, dislikes;
comment: id_user; id_post; text
like/dislike: id_user; id_post; swith between them thanks to boolean/tinyint (1/0)
not good for big scaling -> likes: string, string, string in post table;

// while creating
1.
// To create config
npx sequelize-cli init

generates automatically config, index.js in models
