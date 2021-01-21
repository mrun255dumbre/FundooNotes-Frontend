import config from '../config/config';
import AxiosService from './axios-service'

class LabelService {
    baseUrl = config.baseUrl;

    async createLabel(data) {
        return await AxiosService.postService(`${this.baseUrl}user/label`, data);
    }

    async getLabel() {
        return await AxiosService.getService(`${this.baseUrl}user/label`);
    }

    async editLabel(data, id) {
        return await AxiosService.putService(`${this.baseUrl}user/label?id=`+id, data);
    }

    async deleteLabel(id) {
        return await AxiosService.deleteService(`${this.baseUrl}user/label?id=`+id);
    }
    
    async addLabeltoNote(labelId, noteId) {
        return await AxiosService.getService(`${this.baseUrl}user/labels?labelId=`+labelId+"&noteId="+noteId);
    }
    
    async removeLabelToNote(labelId, noteId) {
        return await AxiosService.getService(`${this.baseUrl}user/label/remove?labelId=`+labelId+"&noteId="+noteId);
    }
}

export default new LabelService();