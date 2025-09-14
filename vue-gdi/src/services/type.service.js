import axios from './axios.service';

export default {

    async getTypesDemande() {
        try {
            const response = await axios.get(`/types`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des types:', error);
            throw error;
        }
    },

}