import {create_UUID} from './uuid';

export interface IMessage {
    content: string;
    date: string;
    sender?: string;
    id?:string;

}

export class Message implements IMessage {
    public content: string;
    public date: string;
    public sender: string;
    public id?:any;

    constructor(content: string, date: string, sender: string) {
        this.content = content;
        this.sender = sender;
        this.date = date;
        this.id = create_UUID;
    }
}



