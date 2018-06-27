import * as React from 'react';
import UsersApi from "../api/userApi";
import {Link} from "react-router-dom";

interface ISignUpProps {

}

interface ISignUpState {

}

class UserSignUp extends React.Component<ISignUpProps, ISignUpState> {
    public username;
    public password;
    public age;

    constructor(props: ISignUpProps) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.age = React.createRef();
    }

    onUserSignHandler = () => {
        const username = this.username.current.value;
        const password = this.password.current.value;
        const age = this.age.current.value;

        UsersApi.createUser({username, password, age})
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
        return (
                <div>
                    <Link to='/'>
                        <button className='login-X'>X</button>
                    </Link>
                    <form onSubmit={this.onUserSignHandler}>
                        <label>Name:</label><input ref={this.username} type="username" name="username"/>
                        <label>Password:</label><input ref={this.password} type="password" name="password"/>
                        <label>Age:</label><input ref={this.age} type="age" name="age"/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
        )
    }

}

export default UserSignUp;