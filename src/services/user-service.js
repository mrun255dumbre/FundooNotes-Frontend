import config from '../config/config';
import AxiosService from './axios-service'

class UserService {
    baseUrl = config.baseUrl;

    async registration(data) {
        return await AxiosService.postService(`${this.baseUrl}signup`, data);
    }

    async login(data) {
        return await AxiosService.postService(`${this.baseUrl}signin`, data);
    }

    async forgotPassword(data) {
        return await AxiosService.postService(`${this.baseUrl}forgotpassword`, data);
    }

    async resetPassword(token, password) {
        return await AxiosService.putService(`${this.baseUrl}resetpassword/`+token, { token, password });
    }

    async getUser() {
        return await AxiosService.getService(`${this.baseUrl}`);
    }
}

export default new UserService();