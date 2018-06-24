import * as React from 'react';
import StateStore, {GroupListState} from '../models/StateStore';
import GroupsApi from "../api/groupsApi";

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
            <ul>{list}</ul>
        )
    }
}

export default GroupList;