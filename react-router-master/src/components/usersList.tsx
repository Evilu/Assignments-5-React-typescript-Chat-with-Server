import * as React from 'react';
import StateStore, {UserListState} from '../models/StateStore';
import UsersApi from '../api/userApi'
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
            <ul>{list}</ul>
        )
    }
}




export default UsersList;