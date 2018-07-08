"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const baseDir = path.join(__dirname.replace('dist' + path.sep, "src" + path.sep).replace("users", "lib"));
const bcrypt = require("bcrypt");
// import {ErrorOccure} from "../../services/errors/errorOccure";
const saltRounds = 10;
class userDataModel {
    constructor() {
        this.data = this.readFromJson();
    }
    readFromJson() {
        const data = fs.readFileSync(path.join(baseDir, 'users.json'));
        return JSON.parse(data.toString());
    }
    writeToJson() {
        fs.writeFileSync(baseDir + '/users.json', JSON.stringify(this.data));
    }
    async getUsers() {
        return await (this.data.user);
    }
    ;
    async createUser(user) {
        user.id = this.data.user[this.data.user.length - 1].id + 1;
        bcrypt.hash(user.password, saltRounds, async (err, hash) => {
            user.password = hash;
            this.data.user.push(user);
            await this.writeToJson();
            return { name: user.name, id: user.id, age: user.age };
        });
    }
    ;
    async authUser(user) {
        const users = await this.readFromJson();
        const foundUser = users.user.find((user1) => {
            return user1.username === user.username;
        });
        if (foundUser) {
            return await compare(user.password, foundUser.password);
        }
    }
    async deleteUser(userId) {
        const userIndex = this.data.user.findIndex(u => u.id == userId);
        this.data.user.splice(userIndex, 1);
        await this.writeToJson();
        return userId;
    }
    ;
    async updateUser(user) {
        const userIndex = this.data.user.findIndex(u => u.id === user.id);
        this.data.user[userIndex] = user;
        await this.writeToJson();
        return user;
    }
}
exports.users = new userDataModel();
function compare(plainPassword, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hash, (err, res) => {
            if (err)
                reject(err);
            resolve(res);
        });
    });
}
//# sourceMappingURL=index.js.map