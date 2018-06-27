import * as fs from "fs";

class groupData {
    data:any;
    constructor() {
        this.data = this.readFromJson();
    }

    readFromJson() {
        const data = fs.readFileSync(__dirname + '/groupData.json');
        return JSON.parse(data.toString());
    }

    writeToJson() {
        fs.writeFileSync(__dirname + '/groupData.json', JSON.stringify(this.data));
    }

    getGroups() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.group);
            }, 500);
        });
    }



    async createGroup(group) {
        group.id = this.data.group[this.data.group.length - 1].id + 1;
        this.data.group.push(group);
       await this.writeToJson();
       return group
        };





    async deleteGroup(groupId) {
        const groupIndex = this.data.group.findIndex(g => g.id == groupId);
        this.data.group.splice(groupIndex,1);
        await this.writeToJson();
        return groupId
        };



    async updateGroup(group) {
        const groupIndex = this.data.group.findIndex(u => u.id === group.id);
        this.data.group[groupIndex] = group;
        await this.writeToJson();
        return group
    };


}

export const groups = new groupData();

