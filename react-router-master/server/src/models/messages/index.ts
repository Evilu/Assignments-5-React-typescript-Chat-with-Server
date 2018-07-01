import * as fs from "fs";
import * as path from "path";

const baseDir = path.join(__dirname.replace('dist'+path.sep, "src"+path.sep).replace("messages", "lib"));

class messagesData {
    data:any;
    constructor() {
        this.data = this.readFromJson();
    }

    readFromJson() {
        const data = fs.readFileSync(path.join(baseDir,'messages.json'));
        return JSON.parse(data.toString());
    }

    writeToJson() {
        fs.writeFileSync(path.join(baseDir,'messages.json'), JSON.stringify(this.data));
    }

    getMessage() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.message);
            }, 500);
        });
    }

    async createMessage(message) {
        message.id = this.data.message.sessionId[this.data.message.sessionId.length - 1].id + 1;
        this.data.message.sessionId.push(message);
        this.writeToJson();
        return message;
    }

    deleteMessage(groupId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const groupIndex = this.data.message.findIndex(u => u.id == groupId);
                this.data.message.splice(groupIndex,1)
                this.writeToJson();
                resolve({status:"ok"});
            }, 500);
        });
    }


}

import {tree} from "../Tree"
tree
export const message = new messagesData();

