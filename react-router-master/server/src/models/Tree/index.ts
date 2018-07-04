import * as fs from "fs";
import * as path from 'path';

const baseDir = path.join(__dirname.replace('dist' + path.sep, "src" + path.sep).replace("Tree", "lib"));

class TreeBuild {
    allJSONSdata: any;
    createHierarchy:any;
    startPoint:any;
    read:any;
    data:any;

    constructor() {
        this.init();
        this.read = this.readFromJson();
        this.createHierarchy = {
            group: this.allJSONSdata.group.reduce((prev, {id, groupName: name, type = 'group'}) =>
                (Object.assign(prev, {[id]: {type, id, name}})), {}),
            user: this.allJSONSdata.user.reduce((prev, {id, username: name, type = 'user'}) =>
                (Object.assign(prev, {[id]: {type, id, name}})), {}),
            groups: {
                groups: Object.assign(
                    this.allJSONSdata.GroupsToGroups.reduce((prev, group) => Object.assign(prev, group), {}),
                    {root: this.allJSONSdata.group.filter(({groupName}) => groupName === 'ROOT').map(({id}) => id)}
                ),
                users: this.allJSONSdata.GroupsToUsers.reduce((prev, user) => Object.assign(prev, user), {})
            }
        };

        this.startPoint = this.findAllNode('root');


    }


    init() {
        const groupData = this.readFromAllJSONS('groupData.json');
        const userData = this.readFromAllJSONS('users.json');
        const GroupsToGroupsData = this.readFromAllJSONS('groupsToGroupsMAP.json');
        const GroupsToUsersData = this.readFromAllJSONS('groupsToUsersMAP.json');
        this.allJSONSdata = {
            group: groupData.group,
            user: userData.user,
            GroupsToGroups: GroupsToGroupsData.GroupsToGroups,
            GroupsToUsers: GroupsToUsersData.GroupsToUsers
        }
        this.allJSONSdata
    }

    readFromAllJSONS(fileName) {
        const allJSONSdata = fs.readFileSync(path.join(baseDir, fileName));
        return JSON.parse(allJSONSdata.toString());
    }

    writeToJson() {
        fs.writeFileSync(path.join(baseDir, 'tree.json'), JSON.stringify(this.startPoint, null, 4));
    }

    async createTree(tree) {
        await this.writeToJson();
        return tree
    };


     findAllNode=(node)=> {

        const result = [
            ...(this.createHierarchy.groups.users[node] || []).map(id => this.createHierarchy.user[id]),
            ...(this.createHierarchy.groups.groups[node] || []).map(id => Object.assign(this.createHierarchy.group[id], {items: this.findAllNode(id)}))
        ];
        return  result;
    }

    readFromJson() {
        const data = fs.readFileSync(path.join(baseDir , 'tree.json'));
        return JSON.parse(data.toString());
    }


     getTree() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.read);
            }, 500);
        });
    }


}

export const tree = new TreeBuild();


