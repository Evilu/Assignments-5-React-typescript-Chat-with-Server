import * as React from 'react';
import StateStore, {GroupListState} from '../models/StateStore';
import GroupsApi from "../api/groupsApi";
import {Link} from "react-router-dom"

class GroupList extends React.Component<any, GroupListState> {
    constructor(props: any) {
        super(props);
        this.state = {groups: []}
    }

    async componentDidMount() {
        await this.getGroups()
    }

    public getGroups = async () => {
        const groups = await StateStore.getInstance().getGroups();

        this.setState({groups: groups})
    };

    onGroupDeleteHandler = (group)=>{
        GroupsApi.deleteGroup (group)
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
        this.state

        const list = this.state.groups.map((group, index) => {
            return <li key={index}>{group.groupName} <button onClick={(e)=>{this.onGroupDeleteHandler(group)}}>delete</button></li>
        });
        return (
            <div>
                <Link to='/'><button className='login-X'>X</button></Link>
            <ul>{list}</ul>
            </div>
        )
    }
}

export default GroupList;