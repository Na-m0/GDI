<template>
    <div class="profile-container">
      <h1>Profil de l'agent</h1>
      <div class="profile-details" v-if="agent">
        <div class="profile-item">
          <label>Login :</label>
          <span>{{ agent.login_agent }}</span>
        </div>
        <div class="profile-item">
          <label>Prénom :</label>
          <span>{{ agent.nom_agent }}</span>
        </div>
        <div class="profile-item">
          <label>Email :</label>
          <span>{{ agent.email_agent }}</span>
        </div>
        <div class="profile-item">
          <label>Fonction :</label>
          <span>{{ agent.nom_fonction }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { agentService } from '@/services/agent.service';

  export default {
    data() {
        return {
            agent: []
        }
    },

    methods: {
    async fetchAgentProfile() {
      const agentId = this.$route.params.id_agent;
      try {
        this.agent = await agentService.getDetailsAgent(agentId);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil de l\'agent:', error);
      }
    }
  },
    mounted() {
        this.fetchAgentProfile()
    },
  }
  </script>
  
  <style scoped>
  .profile-container {
    padding: 20px;
  }
  
  .profile-details {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .profile-item {
    margin-bottom: 10px;
  }
  
  .profile-item label {
    font-weight: bold;
    margin-right: 10px;
  }
  </style>
  