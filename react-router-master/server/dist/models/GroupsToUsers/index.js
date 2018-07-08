"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const baseDir = path.join(__dirname.replace('dist' + path.sep, "src" + path.sep).replace("GroupsToUsers", "lib"));
class groupInUserssData {
    constructor() {
        this.data = this.readFromJson();
    }
    readFromJson() {
        const data = fs.readFileSync(path.join(baseDir, '/groupsToUsersMAP.json'));
        return JSON.parse(data.toString());
    }
    writeToJson() {
        fs.writeFileSync(path.join(baseDir, '/groupsToUsersMAP.json'), JSON.stringify(this.data));
    }
    getGroupstoUsers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.GroupsToUsers);
            }, 500);
        });
    }
    async createGroupInUsers(GroupInUsers) {
        this.data.GroupsToUsers.push(GroupInUsers);
        await this.writeToJson();
        return GroupInUsers;
    }
    ;
    async deleteGroupInUsers(groupId) {
        const groupIndex = this.data.GroupsToUsers.findIndex(g => g.id == groupId);
        this.data.GroupsToUsers.splice(groupIndex, 1);
        await this.writeToJson();
        return groupId;
    }
    ;
}
exports.groupsInUsers = new groupInUserssData();
//# sourceMappingURL=index.js.map