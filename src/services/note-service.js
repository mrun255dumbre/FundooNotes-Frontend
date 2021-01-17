import config from '../config/config';
import AxiosService from './axios-service'

class NoteService {
    baseUrl = config.baseUrl;

    async createNote(data) {
        return await AxiosService.postService(`${this.baseUrl}noteservice/note`, data);
    }

    async getNote() {
        return await AxiosService.getService(`${this.baseUrl}noteservice/note`);
    }

    async pinNote(id) {
        return await AxiosService.putService(`${this.baseUrl}noteservice/note/pin?id=`+id);
    }
    
    async trashNote(id) {
        return await AxiosService.putService(`${this.baseUrl}noteservice/note/trash?id=`+id);
    }
    
    async archiveNote(id) {
        return await AxiosService.putService(`${this.baseUrl}noteservice/note/archive?id=`+id);
    }

    async deleteForEver(id) {
        return await AxiosService.deleteService(`${this.baseUrl}noteservice/note?id=`+id);
    }

    async updateNote(data) {
        return await AxiosService.putService(`${this.baseUrl}noteservice/note?id=`+data.noteId, data);
    }
}

export default new NoteService();