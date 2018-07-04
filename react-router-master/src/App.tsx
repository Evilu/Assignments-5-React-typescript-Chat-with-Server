import * as React from 'react';
import "./App.css";
import ChatTree from './components/ChatTree'
import MessagesList from "./components/Messageslist";
import {IUser} from "./Entities";
import {Link, Route} from "react-router-dom";
import LoginModal from "./components/LoginModal";
import {Redirect, Switch} from "react-router";
import StateStore from "./models/StateStore";
import {Message} from "./models/Message";
import GroupList from "./components/GroupList";
import UsersList from "./components/usersList";
import UserSignUp from "./components/UserSignUp";
import GroupSignUp from './components/GroupSignUp';
import treeApi from './api/treeApi'
import * as io from 'socket.io-client';

export const socket =io('http://localhost:4000',{
    transports: ['websocket']
});

export enum alert {
    none,
    allGood,
    credentials,
    locked
}


interface IAppstate {
    message: string
    items: Iitem[],
    list?: string[],
    loggedInUser: IUser | null,
    loggedInGroup: IUser | null,
    alert: alert,
    counter: number,
    approveUser: boolean,
    selected?: { id: string, type: string }




}


export interface Iitem {

    type: string,
    name: string,
    items?: Iitem[],
    id: string


}

class App extends React.Component<{}, IAppstate> {
    constructor(props: any) {
        super(props);
        this.state = {
            loggedInUser: null,
            loggedInGroup: null,
            alert: alert.none,
            counter: 0,
            approveUser: false,
            items: [],
            message: ''

        }
    }

    async componentDidMount(){
        this.setState({items:await treeApi.getTree()});
    }


    getIDfromElement = (element: any) => {
        this.setState({selected: {id: element.id, type: element.type}});
        const newList = StateStore.getInstance().getGroupMessages(this.state.selected!.id);
        this.setState({message: '', list: newList})
    };

    public onLoginSubmitHandler = async (user: IUser) => {
       let check = await StateStore.getInstance().authUser(user);
       if(check.result === true){
           socket.emit('login',user.username );
           this.setState({
               loggedInUser:user,
               alert: alert.allGood,
               approveUser: true
           });
       }
        else{
           if (this.state.counter === 2) {
               this.setState({
                   loggedInUser: null,
                   alert: alert.locked
               });
           }
           else {
               this.setState((prev) => ({
                   loggedInUser: null,
                   alert: alert.credentials,
                   counter: this.state.counter + 1
               }));
           }
       }
     };

    public submitHandler = (event: any) => {
        event.preventDefault();
        if (this.state.loggedInUser && this.state.selected && this.state.selected!.type === 'group') {
            StateStore.getInstance().addMessageToGroup(this.state.selected!.id, new Message(this.state.message, new Date().toLocaleTimeString(), this.state.loggedInUser!.username));
            const newList = StateStore.getInstance().getGroupMessages(this.state.selected!.id);
            this.setState({message: '', list: newList})
        }
        if (this.state.loggedInUser && this.state.selected && this.state.selected!.type === 'user') {
            StateStore.getInstance().addMessageToUser(this.state.selected!.id, new Message(this.state.message, new Date().toLocaleTimeString(), this.state.loggedInUser!.username));
            const newList = StateStore.getInstance().getUserMessages(this.state.selected!.id);
            this.setState({message: '', list: newList})
        }

    };

    public textChangeHandler = (event: any) => {
        this.setState({message: event.target.value});
    };

    public appRender = () => (
        <div className='main'>
            <div className="main-left">
                <span className="sidebar"><ChatTree getIDfromElement={this.getIDfromElement} items={this.state.items}/></span>

            </div>
            <div className="main-right">
                <div className="messages-list"><MessagesList textChangeHandler={this.textChangeHandler} submitHandler={this.submitHandler} list={this.state.list} message={this.state.message}/></div>
            </div>
        </div>
    );

    public loginRender = () => (this.state.approveUser ? <Redirect to={{pathname: '/chat'}}/> :
        <LoginModal loginStatus={this.state.alert} onSubmit={this.onLoginSubmitHandler}/>);

    render() {
        return (
            <div className="App">
                <Route path='/login' render={this.loginRender}/>
                <nav className="nav">
                    <div className="nav-left">
                        <div className='gbText'>
                            GAME BOY
                        </div>
                        <Link to='/login'>
                            <button className='loginBtn'>Login</button>
                        </Link>
                        <Link to='/userSignUp'>
                        <button className='userRegister'>Register new user</button>
                        </Link>
                        <Link to='/groupSignUp'>
                            <button className='groupRegister'>Register new group</button>
                        </Link>
                        <Link to='/Userlist' >
                        <button className='userBtn'>Manage users</button>
                        </Link>
                        <Link to='/Grouplist'>
                        <button className='groupBtn'>Manage groups</button>
                        </Link>
                        <div hidden={!this.state.loggedInUser}>
                            {this.state.loggedInUser ? this.state.loggedInUser!.username : ""}
                        </div>
                    </div>
                </nav>
                <div className="chat">
                    <Switch>
                        <Route exact={true} path='/' render={this.appRender}/>
                        <Route exact={true} path='/chat' render={this.appRender}/>
                        <Route exact={true} path='/Userlist' component={UsersList}/>
                        <Route exact={true} path='/Grouplist' component={GroupList}/>
                        <Route exact={true} path='/userSignUp' component={UserSignUp}/>
                        <Route exact={true} path='/groupSignUp' component={GroupSignUp}/>
                    </Switch>
                </div>
            </div>

        );
    }
}

export default App;