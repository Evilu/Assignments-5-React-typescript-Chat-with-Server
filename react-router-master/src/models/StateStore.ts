import {messagesModel} from '../models/Messages';
import {IMessage} from "../models/Message";
import groupsApi from "../api/groupsApi";
import usersApi from "../api/userApi";

interface IStateStore {
    state: {};

    set(key: string, val: any): void

    get(key: string): any | null,

    addMessageToGroup(groupId: string, message: IMessage): any

    getGroupMessages(groupId: string): any,
    getGroups():Promise<any[]>
    getUsers():Promise<any[]>
    // deleteUser():Promise<any>

}

class StateStore implements IStateStore {
    state: {} = {};

    public messagesDB = messagesModel;

    set(key: string, val: any) {
        this.state[key] = val;
    }

    get(key: string) {
        return this.state[key] || null;
    }

    public addMessageToGroup(groupId: string, message: IMessage) {
        this.messagesDB.addMessageToGroup(groupId, message)
    }

    public async getGroups (){
        return await groupsApi.getGroups()
    }

    public async getUsers (){
        return await usersApi.getUsers()
    }
    // public async deleteUser(){
    //     return await usersApi.deleteUser
    // }

    public getGroupMessages(groupId: string) {
        return this.messagesDB.getGroupMessages(groupId);
    }

    static instance: IStateStore;

    static getInstance() {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore();
        }
        return StateStore.instance;
    }
}

export interface UserListState {
    users: IUser[]


}
export interface IUser {
    username: string,
    password: string
    age:string
}

export interface GroupListState {
    groups: IGroup[]

}

export interface IGroup {
    groupName:string
}

export default StateStore;