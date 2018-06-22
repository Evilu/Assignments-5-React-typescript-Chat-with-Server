import * as React from 'react';
import StateStore, {Istate2} from '../models/StateStore';

class GroupList extends React.Component<any, Istate2> {
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

    render() {
        this.state

        const list = this.state.groups.map((group, index) => {
            return <li key={index}>{group.groupName}</li>
        });
        return (
            <ul>{list}</ul>
        )
    }
}

export default GroupList;