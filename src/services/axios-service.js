const axios = require('axios').default;
class AxiosService {
    token = "";
    setToken(token) {
        this.token = token;
    }

    async postService(url, payload) {
        if (this.token) {
            return await axios.post(url, payload, {
                headers: {
                    'token': this.token.replaceAll('"', '')
                }
            });
        } else {
            return await axios.post(url, payload);
        }

    }

    async getService(url = '') {
        if (this.token) {
            return await axios.get(url, {
                headers: {
                    'token': this.token.replaceAll('"', '')
                }
            });
        } else {
            return await axios.get(url);
        }
    }

    async putService(url = "", payload = {}) {
        if (this.token) {
            return await axios.put(url, payload, {
                headers: {
                    'token': this.token.replaceAll('"', "")
                }
            });
        } else {
            return await axios.put(url, payload);
        }
    }

    async deleteService(url = "") {
        if (this.token) {
            return await axios.delete(url, {
                headers: {
                    'token': this.token.replaceAll('"', "")
                }
            });
        } else {
            return await axios.delete(url);
        }
    }
}

module.exports = new AxiosService()