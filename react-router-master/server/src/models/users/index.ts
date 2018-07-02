import * as fs from "fs";
import * as path from "path";
const baseDir = path.join(__dirname.replace('dist'+path.sep, "src"+path.sep).replace("users", "lib"));
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

class userDataModel {
    data:any;
    constructor() {
        this.data = this.readFromJson();
    }

    readFromJson() {
        const data = fs.readFileSync(path.join(baseDir , 'users.json'));
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
       bcrypt.hash(user.password, saltRounds, async (err:Error, hash:string) =>{
           user.password = hash;
           this.data.user.push(user);
           await this.writeToJson();
           return {name:user.name, id:user.id, age:user.age};
       });
   };


    async deleteUser(userId) {
        const userIndex = this.data.user.findIndex(u => u.id == userId);
        this.data.user.splice(userIndex,1);
        await this.writeToJson();
        return userId
    };

    async updateUser(user) {
        const userIndex = this.data.user.findIndex(u => u.id === user.id);
        this.data.user[userIndex] = user;
        await this.writeToJson();
        return user
    }


}

export const users = new userDataModel();

