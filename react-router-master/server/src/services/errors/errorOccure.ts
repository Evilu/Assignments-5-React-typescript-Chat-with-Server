export class ErrorOccure extends Error{
    constructor(public status, message){
        super(message);
        this.status = status;
    }
}