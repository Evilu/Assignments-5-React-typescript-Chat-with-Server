const baseUrl = 'http://localhost:4000';

class TreeApi {

    async getTree () {
        return await this.get('/tree');
    }

    get(url) {
        return fetch(baseUrl + url)
            .then(res => res.json());
    }

}

const treeApi = new TreeApi();
export default treeApi;





