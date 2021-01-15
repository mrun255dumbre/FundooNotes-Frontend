const axios = require('axios').default;
class AxiosService {
    async postService(url, payload) {
        return await axios.post(url, payload);
    }

    async getService(url = '') {
        return await axios.get(url);
    }

    async putService(url = "", payload) {
        return await axios.put(url, payload);
    }
}

module.exports = new AxiosService()