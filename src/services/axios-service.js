const axios = require('axios').default;
class AxiosService{
    async postService(url, payload){
        return await axios.post(url, payload);
    }

    async getService(url=''){
        return await axios.get(url);
    } 
}

module.exports = new AxiosService()