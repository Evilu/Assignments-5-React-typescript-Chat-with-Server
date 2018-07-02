import * as fs from "fs";
import * as path from "path";

const baseDir = path.join(__dirname.replace('dist'+path.sep, "src"+path.sep).replace("GroupsToUsers", "lib"));

class groupInUserssData {
    data:any;
    constructor() {
        this.data = this.readFromJson();
    }

    readFromJson() {
        const data = fs.readFileSync(path.join(baseDir,'/groupsToUsersMAP.json'));
        return JSON.parse(data.toString());
    }

    writeToJson() {
        fs.writeFileSync(path.join(baseDir,'/groupsToUsersMAP.json'), JSON.stringify(this.data));
    }

    getGroupstoUsers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.group);
            }, 500);
        });
    }



    async createGroupInUsers (GroupInUsers) {
        this.data.group.push(GroupInUsers);
        await this.writeToJson();
        return GroupInUsers
    };





    async deleteGroupInUsers(groupId) {
        const groupIndex = this.data.group.findIndex(g => g.id == groupId);
        this.data.group.splice(groupIndex,1);
        await this.writeToJson();
        return groupId
    };




}

export const groupsInUsers = new groupInUserssData();

