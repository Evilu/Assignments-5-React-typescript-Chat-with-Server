const baseUrl = 'http://localhost:4000';

class GroupsApi {

    getGroups() {
        return this.get('/groups');
    }

    createGroup(group) {
        return this.post('/groups', group);
    }

    deleteGroup(group) {
        return this.del(`/groups/${group.id}`, group);
    }

    updateGroup(group) {
        return this.put('/group', group);
    }

    get(url) {
        return fetch(baseUrl + url)
            .then(res => res.json());
    }

    post(url, body) {
        return fetch(baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }

     del(url, body) {
        return fetch(baseUrl + url, {
            method: 'DELETE'
        })
            .then((res) => {
                return res.json()
            });
    }

     put(url, body) {
        return fetch(baseUrl + url, {
            method: 'UPDATE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }
}

const groupsApi = new GroupsApi();

export default groupsApi
