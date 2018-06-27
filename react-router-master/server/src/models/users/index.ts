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

   async createUser(user) {
       user.id = this.data.user[this.data.user.length - 1].id + 1;
       this.data.user.push(user);
       this.writeToJson();
       return user
   };


    async deleteUser(userId) {
        const userIndex = this.data.user.findIndex(u => u.id == userId);
        this.data.user.splice(userIndex,1);
        this.writeToJson();
        return userId
    };

    async updateUser(user) {
                const userIndex = this.data.user.findIndex(u => u.id === user.id);
                this.data.user[userIndex] = user;
                this.writeToJson();
    }


}

export const users = new userDataModel();

