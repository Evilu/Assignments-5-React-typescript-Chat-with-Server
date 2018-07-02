const baseUrl = 'http://localhost:4000';

class TreeApi {

    async getTree () {
        return await this.get('/tree');
    }
    async createTree(tree) {
        return await this.post('/tree',tree);
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


}

const treeApi = new TreeApi();
export default treeApi;



