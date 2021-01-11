import config from '../config/config';
import AxiosService from './axios-service'

class UserService {
    baseUrl = config.baseUrl;
    
    async registration(data){
        return await AxiosService.postService(`${this.baseUrl}signup`, data);
    }

    async login(data){
        return await AxiosService.postService(`${this.baseUrl}login`, data);
    }

    async forgotPassword(data){
        return await AxiosService.postService(`${this.baseUrl}forgotpassword`, data);
    }
}

export default new UserService();