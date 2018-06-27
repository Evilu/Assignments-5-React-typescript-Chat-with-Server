import * as React from 'react';
import GroupsApi from "../api/groupsApi";
import {Link} from "react-router-dom";

interface IgroupSignUpProps {

}

interface IGroupSignUpState {

}

class GroupSignUp extends React.Component<IgroupSignUpProps, IGroupSignUpState> {
    public groupName;

    constructor(props: IgroupSignUpProps) {
        super(props);
        this.groupName = React.createRef();
    }

    onGroupSignHandler = () => {
        const groupName = this.groupName.current.value;

        GroupsApi.createGroup({groupName})
            .then(() => {
                GroupsApi.getGroups()
                    .then((groups) => {
                        this.setState((prevState) => ({
                            groups: groups
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
                <form onSubmit={this.onGroupSignHandler}>
                    <label>New group name:</label><input ref={this.groupName} type="group" name="group"/>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }

}

export default GroupSignUp;