import axios from './axios.service';

export const agentService = {

  // Fonction pour l'agent
  async loginAgent(agentInfo) {
    try {
      const response = await axios.post('/agents/login', agentInfo);

      // Vérifie si un token est renvoyé dans la réponse
      if (response.data.token) {
        // Stocke l'ID de l'agent et le token dans le stockage local du navigateur
        localStorage.setItem('agentID', response.data.agent.id_agent);
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error('Échec de la connexion');
    }
  },

  async inscription(agentDetails) {
    try {
      const response = await axios.post('/agents', agentDetails);
      return response.data;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw new Error('Échec de l\'inscription');
    }
  },
  logout() {
    localStorage.removeItem('agentID');
    localStorage.removeItem('authToken');
  },

  /// GET
  async getAgents() {
    try {
      const response = await axios.get('/agents');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des agents:', error);
      throw new Error('Impossible de récupérer les agents');
    }
  },
  async getDetailsAgent(id_agent) {
    try {
      const response = await axios.get(`/agents/${id_agent}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l’agent:', error);
      throw new Error('Impossible de récupérer les détails de l’agent');
    }
  },
  async getServiceAgent(id_agent) {
    try {
        const response = await axios.get(`/services/agent/${id_agent}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        throw new Error('Échec de la recuperations du service');
      }
  },

  async getAgentServices(id_agent) {
    try {
      const response = await axios.get(`/agents/services/${id_agent}`);
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
      throw new Error('Échec de la recuperations du service');
    }
  },

  async getServicesByDgs(id_dgs) {
    try {
      const response = await axios.get(`/agents/services/dgs/${id_dgs}`);
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
      throw new Error('Échec de la recuperations du service');
    }
  },

  async getAgentService(id_agent, id_service) {
    try {
      const response = await axios.get(`/agents/service/${id_agent}/${id_service}`);
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
      throw new Error('Échec de la recuperations du service');
    }
  },

  // Delete
  async deleteAgent(id_agent) {
    try {
      const response = await axios.delete(`/agents/${id_agent}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'agent:', error);
      throw new Error('Échec de la suppression de l\'agent');
    }
  },

  // Update
  async updateAgent(
      nom_agent,
      login_agent,
      email_agent,
      password_agent,
      id_service
    ) {
    try {
      const response = await axios.put(`/agents/${id_agent}`, {
        nom_agent,
        login_agent,
        email_agent,
        password_agent,
        id_service
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'agent:', error);
      throw new Error('Échec de la mise à jour de l\'agent');
    }
  },
};


axios.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});