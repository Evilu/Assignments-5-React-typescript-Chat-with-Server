import * as React from 'react';
import StateStore, {UserListState} from '../models/StateStore';
import UsersApi from '../api/userApi'
import {Link} from 'react-router-dom'
class UsersList extends React.Component<any, UserListState> {
    constructor(props: any) {
        super(props);
        this.state = {users: []}
    }

    async componentDidMount() {
        await this.getUsers()
    }

    public getUsers = async () => {
        const users = await StateStore.getInstance().getUsers();

        this.setState({users: users})
    };

    onUserDeleteHandler = (user)=>{
        UsersApi.deleteUser (user)
            .then(() => {
                UsersApi.getUsers()
                    .then((users) => {
                        this.setState((prevState) => ({
                            users: users
                        }));


                    });
            })
    };

    render() {
        this.state

        const list = this.state.users.map((user, index) => {
            return <li key={index}>{user.username} age:{user.age} <button onClick={(e)=>{this.onUserDeleteHandler(user)}}>delete</button></li>
        });
        return (
            <div>
                <Link to='/'><button className='login-X'>X</button></Link>
            <ul>{list}</ul>
                </div>
        )
    }
}




export default UsersList;