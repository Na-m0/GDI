import axios from './axios.service';

export default {

    async getCampagnesBudgetaire() {
        try {
            const response = await axios.get(`/campagnes`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des campagnes:', error);
            throw error;
        }
    },

}