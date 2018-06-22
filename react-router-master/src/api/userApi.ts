const baseUrl = 'http://localhost:4000';

class UsersApi {

    async getUsers() {
        return await this.get('/users');
    }

    static createUser(user) {
        return this.post('/users', user);
    }

    static deleteUser(user) {
        return this.del(`/users/${user.id}`, user);

    }

    static updateUser(user) {
        return this.put('/users', user);
    }

    get(url) {
        return fetch(baseUrl + url)
            .then(res => res.json());
    }

    static post(url, body) {
        return fetch(baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }

    static del(url, body) {
        return fetch(baseUrl + url, {
            method: 'DELETE'
        })
            .then((res) => {
                return res.json()
            });
    }

    static put(url, body) {
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

const usersApi = new UsersApi();
export default usersApi;





