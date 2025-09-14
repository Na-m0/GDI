import axios from './axios.service';


export default {

    // GET
    async getDemandeById(id_demande) {
        try {
            const response = await axios.get(`/demandes/${id_demande}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
    },

    async getDemandesService(serviceId) {
        try {
            const response = await axios.get(`/demandes/service/${serviceId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
    },

    // SUM
    // GET la somme du budget des demandes par service
    async getSumBudgetByServiceId(serviceId) {
      try {
            const response = await axios.get(`/demandes/budget/${serviceId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
    },

    async getSumBudgetByDgaId(id_dga) {
        try {
            const response = await axios.get(`/demandes/budget/dga/${id_dga}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
      },

    // COUNT
    // GET le nombre de demandes pour different status d'un service
    async getNombreDemandesByStatus(id_status,id_service) {
        try {
            const response = await axios.get(`/demandes/status/${id_status}/${id_service}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
    },

    // GET le nombre de demandes pour different status pour chaque service du DGA
    async getNombreDemandesByStatutAndDga(id_status,id_dga) {
        try {
            const response = await axios.get(`/demandes/status/dga/${id_status}/${id_dga}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
    },


    // GET les demandes pour chaque service du DGA
    async getDemandesServicesDga(id_dga) {
        try {
            const response = await axios.get(`/demandes/services/${id_dga}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
    },

    async getDemandesDgs(id_dgs) {
        try {
            const response = await axios.get(`/demandes/dgs/${id_dgs}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
    },

    // AUTRE FONCTION
    async deleteDemande(id_demande) {
        try {
            await axios.delete(`/demandes/${id_demande}`);
            alert("demande supprimée avec succès");
        } catch (error) {
            console.error('Erreur lors de la suppression de la demande:', error);
            alert("Erreur lors de la suppression: " + (error.response ? error.response.data.message : error.message));
        }
    },
    async updateDemande(id_demande, updatedDemande) {
        try {
            await axios.put(`/demandes/${id_demande}`, updatedDemande);
            alert("demande modifié avec succès");
        } catch (error) {
            console.error('Erreur lors de la modification de la demande:', error);
            alert("Erreur lors de la modification: " + (error.response ? error.response.data.message : error.message));
        }
    },

    async updateStatusDemande(id_demande, id_status) {
        try {
            await axios.put(`/demandes/status/${id_demande}`,  { id_status });
            alert("Demande modifié avec succès !");
        } catch (error) {
            console.error('Erreur lors de la modification de la demande:', error);
            throw error;
        }
    },

    async updateMotifDemande(id_demande, motifDemande) {
        try {
            await axios.put(`/demandes/motif/${id_demande}`, motifDemande);
        } catch (error) {
            console.error('Erreur lors de la modification de la demande:', error);
            alert("Erreur lors de la modification: " + (error.response ? error.response.data.message : error.message));
        }
    },

    async createDemande(demandeData) {
        try {
            const response = await axios.post('/demandes', demandeData);
            alert("Demande ajoutée avec succès !");
            return response; // return pour accéder aux informations de la demande
        } catch (error) {
            console.error('Erreur lors de la création de la demande:', error);
            throw error;
        }
    },

}

