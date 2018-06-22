export class messagesApi {
    static baseUrl = 'http://localhost:4000';

    static getMessage() {
        return this.get('/messages');
    }

    static createmessage(message) {
        return this.post('/messages', message);
    }

    static get(url) {
        return fetch(this.baseUrl + url)
            .then(res => res.json());
    }

    static post(url, body) {
        return fetch(this.baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }

    static del(url) {
        return fetch(this.baseUrl + url, {
            method: 'DELETE'
        })
            .then((res) => {
                return res.json()
            });
    }

    static put(url, body) {
        return fetch(this.baseUrl + url, {
            method: 'UPDATE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }
}



