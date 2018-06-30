"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const baseDir = path.join(__dirname.replace('dist' + path.sep, "src" + path.sep).replace("users", "lib"));
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
    getUsers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.user);
            }, 500);
        });
    }
    async createUser(user) {
        user.id = this.data.user[this.data.user.length - 1].id + 1;
        this.data.user.push(user);
        await this.writeToJson();
        return user;
    }
    ;
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
// import {tree} from "../Tree/index";
// tree;
//
//# sourceMappingURL=index.js.map