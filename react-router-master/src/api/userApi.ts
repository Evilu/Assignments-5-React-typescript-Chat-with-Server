const baseUrl = 'http://localhost:4000';

class UsersApi {

    async getUsers() {
        return await this.get('/users');
    }

    async authUser(user):Promise<any>{
        return await this.post('/users?login=true',user)
    }

     async createUser(user) {
        return await this.post('/users', user);
    }

    async deleteUser(user) {
        return await this.del(`/users/${user.id}`, user);

    }

    static updateUser(user) {
        return this.put('/users', user);
    }

    get(url) {
        return fetch(baseUrl + url)
            .then(res => res.json());
    }

     async post(url, body) :Promise<any>{
         return fetch(baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (res) => {
                return await res.json()
            });
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





