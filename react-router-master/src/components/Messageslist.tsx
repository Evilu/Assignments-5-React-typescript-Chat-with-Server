import * as React from 'react';
import ChatInput from "./ChatInput";
import "../App.css";
import {IMessage} from "../models/Message";
import {socket} from '../App';

interface IMessagesListState {
    message?:string,
    currentMessage?:IMessage[],
}

interface IMessagesListProps {
    list:any,
    message:any,
    submitHandler(event:any):void,
    textChangeHandler(event:any):void

}

class MessagesList extends React.Component<IMessagesListProps,IMessagesListState> {
    constructor(props:IMessagesListProps) {
        super(props);
        this.state = {
            currentMessage:this.props.list || []
        }
    }

     componentDidMount(){
        socket.on('msg', (msg:IMessage)=>{
            this.setState((prevState)=>{
                return {
                    currentMessage: [
                        ...prevState.currentMessage,msg
                    ]
                }
            })
        });


    }


    render() {
        let list;

        if(this.state.currentMessage){
             list = this.state.currentMessage.map((message:any,index:number)=>{
                 return <li key={index}>{message.sender}:{message.content} <div className="message-date"> {message.date} </div></li>
            });
        }
            return (
                <div>
                    <div className="list">
                        <ul>
                            {list}
                        </ul>
                    </div>
                    <div className="new-message">

                        <ChatInput message={this.props.message} textChangeHandler={this.props.textChangeHandler} submitHandler={this.props.submitHandler} />
                    </div>
                </div>
            );
        }
}


export default MessagesList;