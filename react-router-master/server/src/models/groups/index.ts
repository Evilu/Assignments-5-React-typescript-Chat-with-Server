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



    createGroup(group) {
        return new Promise((resolve) => {
            setTimeout(() => {
                group.id = this.data.group[this.data.group.length - 1].id + 1;
                this.data.group.push(group);
                this.writeToJson();
                resolve(group);
            }, 500);
        });
    }



    deleteGroup(groupId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const groupIndex = this.data.group.findIndex(g => g.id == groupId);
                this.data.group.splice(groupIndex,1);
                this.writeToJson();
                resolve({status:"ok"});
            }, 500);
        });
    }

    updateGroup(group) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const groupIndex = this.data.group.findIndex(u => u.id === group.id);
                this.data.group[groupIndex] = group;
                this.writeToJson();
                resolve(group);
            }, 500);
        });
    }


}

export const groups = new groupData();

