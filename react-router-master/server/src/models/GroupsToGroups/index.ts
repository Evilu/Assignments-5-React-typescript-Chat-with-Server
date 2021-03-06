import * as fs from "fs";
import * as path from "path";

const baseDir = path.join(__dirname.replace('dist'+path.sep, "src"+path.sep).replace("GroupsToGroups", "lib"));

class groupInGroupsData {
    data:any;
    constructor() {
        this.data = this.readFromJson();
    }

    readFromJson() {
        const data = fs.readFileSync(path.join(baseDir,'/groupsToGroupsMAP.json'));
        return JSON.parse(data.toString());
    }

    writeToJson() {
        fs.writeFileSync(path.join(baseDir,'/groupsToGroupsMAP.json'), JSON.stringify(this.data));
    }

    getGroupstoGroups() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.GroupsToGroups);
            }, 500);
        });
    }

    async createGroupInGroup (GroupInGroup) {
        this.data.GroupsToGroups.push(GroupInGroup);
        await this.writeToJson();
        return GroupInGroup
    };



    async deleteGroupInGroup(groupId) {
        const groupIndex = this.data.GroupsToGroups.findIndex(g => g.id == groupId);
        this.data.GroupsToGroups.splice(groupIndex,1);
        await this.writeToJson();
        return groupId
    };




}

export const groupsInGroups = new groupInGroupsData();

