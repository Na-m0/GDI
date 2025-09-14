import axios from './axios.service';


export default {

    async getServices() {
        try {
            const response = await axios.get(`/services`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des prioritées:', error);
            throw error;
        }
    },
    async getAllServicesByDga(id_dga) {
        try {
            const response = await axios.get(`/services/dga/${id_dga}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des prioritées:', error);
            throw error;
        }
    },

    //getAllServicesByDgs(id_dgs) {
    //    try {
    //        const response = await axios.get('')
    //    }
    //}
    
}

