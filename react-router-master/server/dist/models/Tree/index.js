"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const baseDir = path.join(__dirname.replace('dist' + path.sep, "src" + path.sep).replace("Tree", "lib"));
class TreeBuild {
    constructor() {
        this.init();
        this.createHierarchy = {
            group: this.data.group.reduce((prev, { id, groupName: name, type = 'group' }) => (Object.assign(prev, { [id]: { type, id, name } })), {}),
            user: this.data.user.reduce((prev, o) => (Object.assign(prev, { [o.id]: o })), {}),
            groups: {
                groups: Object.assign(this.data.GroupsToGroups.reduce((prev, group) => Object.assign(prev, group), {}), { root: this.data.group.filter(({ groupName }) => groupName === 'ROOT').map(({ id }) => id) }),
                users: this.data.GroupsToUsers.reduce((prev, user) => Object.assign(prev, user), {})
            }
        };
        this.startPoint = this.findAllNode('root');
    }
    init() {
        const groupData = this.readFromJson('groupData.json');
        const userData = this.readFromJson('users.json');
        const GroupsToGroupsData = this.readFromJson('groupsToGroupsMAP.json');
        const GroupsToUsersData = this.readFromJson('groupsToUsersMAP.json');
        this.data = {
            group: groupData.group,
            user: userData.user,
            GroupsToGroups: GroupsToGroupsData.GroupsToGroups,
            GroupsToUsers: GroupsToUsersData.GroupsToUsers
        };
        this.data;
    }
    readFromJson(fileName) {
        const data = fs.readFileSync(path.join(baseDir, fileName));
        return JSON.parse(data.toString());
    }
    writeToJson(fileName) {
        fs.writeFileSync(path.join(baseDir, fileName), JSON.stringify(this.data));
    }
    findAllNode(node) {
        const result = [
            ...(this.createHierarchy.groups.users[node] || []).map(id => this.createHierarchy.user[id]),
            ...(this.createHierarchy.groups.groups[node] || []).map(id => Object.assign(this.createHierarchy.group[id], { items: this.findAllNode(id) }))
        ];
        return result;
    }
}
exports.tree = new TreeBuild();
// console.log(JSON.stringify(TreeBuild.startPoint,null,4));
//# sourceMappingURL=index.js.map