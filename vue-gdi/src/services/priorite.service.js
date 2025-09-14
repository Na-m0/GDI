import axios from './axios.service';

export default {

    async getPrioritesDemande() {
        try {
            const response = await axios.get(`/priorites`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des prioritées:', error);
            throw error;
        }
    },

}