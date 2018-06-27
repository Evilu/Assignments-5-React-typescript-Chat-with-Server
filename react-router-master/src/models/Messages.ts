import {IMessage} from '../models/Message'

class MessagesModel {
    public messages: {};

    constructor() {
        this.messages = {}
    }

    public addMessageToGroup(groupId: string, message: IMessage) {
        if (this.messages[groupId]) {
            this.messages[groupId].push(message)
        } else {
            this.messages[groupId] = [message];
        }
    }

    public getGroupMessages(groupId: string) {
        return this.messages[groupId]
    }

    public addMessageToUser(usersId: string, message: IMessage) {
        if (this.messages[usersId]) {
            this.messages[usersId].push(message)
        } else {
            this.messages[usersId] = [message];
        }
    }

    public getUserMessages(usersId: string) {
        return this.messages[usersId]
    }

}




export const messagesModel = new MessagesModel();

