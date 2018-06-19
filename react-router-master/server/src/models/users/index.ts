import * as fs from "fs";

class userDataModel {
    data:any;
    constructor() {
        this.data = this.readFromJson();
    }

    readFromJson() {
        const data = fs.readFileSync(__dirname + '/users.json');
        return JSON.parse(data.toString());
    }

    writeToJson() {
        fs.writeFileSync(__dirname + '/users.json', JSON.stringify(this.data));
    }

    getUsers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.user);
            }, 500);
        });
    }

    createUser(user) {
        return new Promise((resolve) => {
            setTimeout(() => {
                user.id = this.data.user[this.data.user.length - 1].id + 1;
                this.data.user.push(user);
                this.writeToJson();
                resolve(user);
            }, 500);
        });
    }

    deleteUser(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userIndex = this.data.user.findIndex(u => u.id == userId);
                this.data.user.splice(userIndex,1);
                this.writeToJson();
                resolve({status:"ok"});
            }, 500);
        });
    }

    updateUser(user) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userIndex = this.data.user.findIndex(u => u.id === user.id);
                this.data.user[userIndex] = user;
                this.writeToJson();
                resolve({status:"ok"});
            }, 500);
        });
    }


}

export const users = new userDataModel();

