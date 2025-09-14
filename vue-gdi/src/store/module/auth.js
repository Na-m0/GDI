import { agentService } from '../../services/agent.service';

// Fonction pour vérifier si un token JWT est expiré
function isTokenExpired(token) {
    // Vérifie si le token est null, undefined ou une chaîne vide
    if (!token) {
      return true; // Le token est considéré comme expiré s'il est absent
    }
    // Divise le token en ses trois parties (header, payload, signature)
    const parts = token.split('.');
    // Vérifie si le token est valide (doit contenir trois parties)
    if (parts.length !== 3) {
      return true; // Le token est considéré comme expiré s'il est invalide
    }
    try {
        // Extraction du payload du token (la partie centrale)
        const payloadBase64 = parts[1];
        // Décodage du payload Base64 en JSON
        const decodedJson = atob(payloadBase64);
        // Conversion de la chaîne JSON en objet JavaScript
        const decodedToken = JSON.parse(decodedJson);
        // Extraction de la propriété "exp" (temps d'expiration) du token
        const exp = decodedToken.exp;
        // Obtention du temps actuel
        const now = new Date();
        // Comparaison entre le temps actuel et le temps d'expiration du token
        return now.getTime() > exp * 1000; // Si le temps actuel est supérieur au temps d'expiration, le token est expiré
    } catch (error) {
        // En cas d'erreur lors du traitement du token, il est considéré comme expiré par mesure de sécurité
        return true;
    }
}


const state = {
  token: localStorage.getItem('authToken') || null,
  agentID: localStorage.getItem('agentID') || null,
  agentDetails: null,
  fonction: null,

};

const getters = {
  isAuthenticated: state => !isTokenExpired(state.token),
  agentID: state => state.agentID,
  agentDetails: state => state.agentDetails,
  agentIdFonction: state => state.agentDetails ? state.agentDetails.id_fonction : null,
  agentFonction: state => state.fonction,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('authToken', token);
  },
  SET_AGENT_ID(state, agentID) {
    state.agentID = agentID;
    localStorage.setItem('agentID', agentID); 
  },
  SET_AGENT_DETAILS(state, agentDetails) {
    state.agentDetails = agentDetails;
    state.fonction = agentDetails ? agentDetails.id_fonction : null;
  },
}

const actions = {
    async loginAgent({ commit }, info) {
        try {
            // Appel à un service pour la connexion de l'agent
            const response = await agentService.loginAgent(info);

            // Récupération du token et de l'ID de l'agent depuis la réponse
            const token = response.token;
            const agentID = response.agent.id_agent;

            if (token) {
                // Si un token est reçu, le stocker dans le store Vuex et mettre à jour les détails de l'agent
                commit('SET_TOKEN', token);
                commit('SET_AGENT_ID', agentID);
                commit('SET_AGENT_DETAILS', response.agent);

                return true; // Retourner vrai pour indiquer une connexion réussie
            } else {
                throw new Error('Token non reçu du backend');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            commit('SET_TOKEN', null);
            commit('SET_AGENT_ID', null);
            commit('SET_AGENT_DETAILS', null);

            // Supprimer les données d'authentification stockées localement
            localStorage.removeItem('authToken');
            localStorage.removeItem('agentID');

            return false; // Retourner faux pour connexion échouée
        }
    },
    async fetchAgentDetails({ commit }, id_agent) {
      try {
          const agentDetails = await agentService.getDetailsAgent(id_agent);
          commit('SET_AGENT_DETAILS', agentDetails);
      } catch (error) {
          console.error('Erreur lors de la récupération des détails de l’agent:', error)
      }
    },
    initializeAuthentication({ commit, dispatch }) {
        // Prend le token stocker dans le localStorage
        const token = localStorage.getItem('authToken');
        // Si il y a un token déjà présent
      if (token && !isTokenExpired(token)) {
          // Prend le token et le stock
          commit('SET_TOKEN', token);
        const agentID = localStorage.getItem('agentID');
        // Si agent déjà présent, récupère les détails de l'agent
        if (agentID) {
            dispatch('fetchAgentDetails', agentID);
        }
    } else {
        // Si le token n'est pas présent, réinitialise l'état
        commit('SET_TOKEN', null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('agentID');
      }
    },
    async inscription({ commit }, agentDetails) {
        try {
            const data = await agentService.inscription(agentDetails);
            commit('SET_AGENT_DETAILS', data)
            return true;
        } catch (error) {
            console.error('Erreur lors de l’inscription:', error)
            return false;
        }
    },
    logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_AGENT_ID', null);
      commit('SET_AGENT_DETAILS', null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('agentID');
    },
    

    /*
    verifyAgentAuthentication({ state }) {
        console.log('Vérification de l\'authentification: ', state.token);
      return new Promise((resolve, reject) => {
          if (state.token && !isTokenExpired(state.token)) {
            console.log('Agent authentifié avec token:', state.token);
          resolve();
          } else {
            console.log('Agent non authentifié ou token expiré');
            reject('Agent non authentifié');
          }
      });
    },
     */
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
