import * as React from 'react';
import StateStore from '../models/StateStore';

interface IState {
    users: IUser[]
}

interface IUser {
    username: string,
    password: string
    age:string
}

class UsersList extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {users:[]}
    }

    async componentDidMount() {
        await this.getUsers()
    }

    public  getUsers = async() => {
        const users = await StateStore.getInstance().getUsers();

        this.setState({users: users})
    };

    render() {
        this.state

        const list = this.state.users.map((user, index) => {
            return <li key={index}>{user.username} age:{user.age}</li>
        });
        return (
            <ul>{list}</ul>
        )
    }
}

export default UsersList;