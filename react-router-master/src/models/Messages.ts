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

}

export const messagesModel = new MessagesModel();

