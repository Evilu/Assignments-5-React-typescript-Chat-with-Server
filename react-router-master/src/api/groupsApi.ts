const baseUrl = 'http://localhost:4000';

class GroupsApi {

   async getGroups() {
        return await this.get('/groups');
    }

    createGroup(group) {
        return this.post('/groups', group);
    }

   async deleteGroup(group) {
        return await this.del(`/groups/${group.id}`, group);
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
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
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
