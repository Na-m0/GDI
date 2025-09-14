import axios from './axios.service';


export default {

    async createFileDemande(fileData) {
        try {
            await axios.post('/files', fileData);
        } catch (error) {
            console.error('Erreur lors de la création de la demande:', error);
            throw error;
        }
    },

    async getFilesByIdDemande(id_demande) {
        try {
            const response = await axios.get(`/files/${id_demande}`);
            // Vérification si les données sont vides ou nulles
            if (!response.data || response.data.length === 0) {
                return 0;
            }
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
            throw error;
        }
    },

    async updateFile(id_file, updatedFile) {
        try {
            await axios.put(`/files/${id_file}`, updatedFile);
            alert("Fichier modifié avec succès");
        } catch (error) {
            console.error('Erreur lors de la modification de la demande:', error);
            alert("Erreur lors de la modification: " + (error.response ? error.response.data.message : error.message));
        }
    },
    
    async deleteFileLine(id_file) {
        try {
          await axios.delete(`/files/${id_file}`);
          alert("Fichier supprimé avec succès");
        } catch (error) {
          console.error('Erreur lors de la suppression du fichier:', error);
          alert("Erreur lors de la suppression: " + (error.response ? error.response.data.message : error.message));
        }
      },
      
      async deleteFile(id_file) {
        try {
          await axios.delete(`/files/uploads/${id_file}`);
          alert("Fichier supprimé avec succès");
        } catch (error) {
          console.error('Erreur lors de la suppression du fichier:', error);
          alert("Erreur lors de la suppression: " + (error.response ? error.response.data.message : error.message));
        }
      },

      async deleteFilesDemande(id_demande) {
        try {
          await axios.delete(`/files/demande/${id_demande}`);
        } catch (error) {
          console.error('Erreur lors de la suppression du fichier:', error);
          alert("Erreur lors de la suppression: " + (error.response ? error.response.data.message : error.message));
        }
      }
}
