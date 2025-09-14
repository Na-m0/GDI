<template>
  <div>
    <div class="filter-container">
      <select v-model="selectedCampagne" @change="fetchDemandes" class="styled-select">
        <option v-for="campagne in campagnes" :key="campagne.id_campagne" :value="campagne.id_campagne">
          {{ campagne.nom_campagne }}
        </option>
        <option value="">Toutes les campagnes</option>
      </select>
      <p v-if="isPreviousYear" class="warning-message">Campagne terminée</p>
    </div>
    <div class="container">
      <table class="demandes-table">
        <thead>
          <tr>
            <th class="obj">Objet</th>
            <th style="text-align: left;">Priorité</th>
            <th class="justificatif">Justificatif</th>
            <th>CPU</th>
            <th>Budget estimatif</th>
            <th class="status">Statut</th>
            <th style="text-align: left;">Actions</th>
          </tr>
        </thead>
        <tbody v-for="demande in filteredDemandes" :key="demande.id_demande">
          <tr>
            <td>
              <div class="objet">{{ demande.objet }}</div>
              <div class="demande-type">{{ demande.nom_type }}</div>
            </td>
            <td>{{ demande.nom_priorite }}</td>
            <td class="justificatif">{{ demande.justificatif }}</td>
            <td>{{ demande.cpu }}</td>
            <td>{{ demande.budget_estimatif }} €</td>
            <td>
              <div :class="statusClass(demande.id_status)">
                {{ demande.nom_status }}
              </div>
            </td>
            <td>
              <button @click="toggleActions(demande.id_demande)" class="action-toggle">
                <span v-if="isActionsVisible(demande.id_demande)" class="material-icons">expand_more</span>
                <span v-else class="material-icons">chevron_right</span>
              </button>
            </td>
          </tr>
          <tr v-if="isActionsVisible(demande.id_demande)">
            <td colspan="7">
              <div class="action-buttons-container">
                <button v-if="canArbitrate(demande)" @click="updateDemande(demande.id_demande)" class="action-button">Modifier</button>
                <button v-if="canArbitrate(demande)" @click="confirmDeleteDemande(demande)" class="action-button">Supprimer</button>
                <button @click="detailDemande(demande.id_demande)" class="action-button">Voir</button>
                <button v-if="fonctionAgent > 1 && canArbitrate(demande)" @click="openArbitrateDialog(demande.id_demande, demande.objet)" class="action-button">Arbitrer</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    <!-- Modale de confirmation de suppression -->
    <div v-if="showDeleteDialog" class="modal">
      <div class="modal-content-supp">
        <span class="close" @click="closeDeleteDialog">&times;</span>
        <p class="text-supp">Êtes-vous sûr de vouloir supprimer la demande <b>{{ currentDemandeToDelete?.objet }}</b> ?</p>
        <div class="action-buttons-container-supp">
          <button class="action-button" @click="deleteDemandeConfirmed">Confirmer</button>
          <button class="action-button" @click="closeDeleteDialog">Annuler</button>
        </div>
      </div>
    </div>

    <!-- Votre modale existante -->
    <div v-if="showDialog" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeDialog">&times;</span>
        <div class="arbitrage">
          <p>Voulez-vous valider ou refuser la demande <b>{{ currentDemandeName }}</b> ?</p>
        </div>

        <div class="radio-input">
          <input value="valider" v-model="currentAction" name="action-radio" id="valider" type="radio">
          <label for="valider">Valider</label>
          <input value="refuser" v-model="currentAction" name="action-radio" id="refuser" type="radio">
          <label for="refuser">Refuser</label>
        </div>

        <div>
          <p class="motift">Veuillez saisir votre <b>motif</b> de {{ currentAction === 'valider' ? 'validation' : currentAction === 'refuser' ? 'refus' : '' }} :</p>
          <textarea v-if="fonctionAgent === 2" v-model="motif_responsable" rows="4" cols="50"></textarea>
          <textarea v-if="fonctionAgent === 3" v-model="motif_dga" rows="4" cols="50"></textarea>
          <textarea v-if="fonctionAgent === 4" v-model="motif_dgs" rows="4" cols="50"></textarea>
          <textarea v-if="fonctionAgent === 5" v-model="motif_sicig" rows="4" cols="50"></textarea>
        </div>

        <button class="action-button" @click="submitMotif">Confirmer</button>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import demandeService from '@/services/demande.service';
import { agentService } from '@/services/agent.service';
import fileService from '@/services/file.service';
import campagneService from '@/services/campagne.service';

export default {
  data() {
    return {
      fonctionAgent: 0,
      serviceId: null,
      service: {},
      demandes: [],
      campagnes: [],
      selectedCampagne: '',
      showDialog: false,
      showMotifDialog: false,
      demandeIdToArbitrate: null,
      currentDemandeName: '',
      agent: {},
      visibleActions: null,

      motif_responsable: '',
      motif_dga: '',
      motif_dgs: '',
      motif_sicig: '',

      currentAction: null,
      showDeleteDialog: false,
      currentDemandeToDelete: null,
      isPreviousYear: false,

    }
  },
  computed: {
    filteredDemandes() {
      if (!this.selectedCampagne) {
        return this.demandes;
      }
      return this.demandes.filter(demande => demande.id_campagne === this.selectedCampagne);
    }
  },
  methods: {
    toggleActions(id) {
      this.visibleActions = this.visibleActions === id ? null : id;
    },
    isActionsVisible(id) {
      return this.visibleActions === id;
    },
    async detailDemande(id_demande) {
      try {
        this.$router.push({
          name: 'detailDemande',
          params: { id_demande }
        });
      } catch (error) {
        console.error('Erreur lors de la modification de l\'utilisateur', error);
      }
    },
    async updateDemande(id_demande) {
      try {
        this.$router.push({
          name: 'UpdateDemande',
          params: { id_demande }
        });
      } catch (error) {
        console.error('Erreur lors de la modification de la demande', error);
      }
    },
    confirmDeleteDemande(demande) {
      this.currentDemandeToDelete = demande;
      this.showDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
      this.currentDemandeToDelete = null;
    },
    async deleteDemandeConfirmed() {
      try {
        await fileService.deleteFilesDemande(this.currentDemandeToDelete.id_demande);
        await demandeService.deleteDemande(this.currentDemandeToDelete.id_demande);
        this.fetchDemandes();
        this.closeDeleteDialog();
      } catch (error) {
        console.error("Erreur lors de la suppression de la demande", error);
      }
    },
    async deleteDemande(id_demande) {
      try {
        await fileService.deleteFilesDemande(id_demande)
        await demandeService.deleteDemande(id_demande)
        this.fetchDemandes();
      } catch (error) {
        console.error("Erreur lors de la suppression de la demande", error);
      } 
    },
    async fetchFonctionAgent() {
      try {
        const agentID = this.$store.state.auth.agentID;
        const fonctionResponse = await agentService.getDetailsAgent(agentID);
        this.fonctionAgent = fonctionResponse.id_fonction;
        this.agent = await agentService.getServiceAgent(agentID);
        // Je sais pas
        // if (this.serviceId !== null) {
        //   this.service = await agentService.getAgentService(agentID, this.serviceId);
        // }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'agent:", error);
      }
    },
    async fetchCampagnes() {
      try {
        this.campagnes = await campagneService.getCampagnesBudgetaire();
        this.prioritizeCurrentYearCampagne();
      } catch (error) {
        console.error("Erreur lors de la récupération des campagnes budgétaires:", error);
      }
    },
    async fetchDemandes() {
      try {
        if (this.serviceId) {
          this.demandes = await demandeService.getDemandesService(this.serviceId);
        } else if (this.fonctionAgent < 3) {
          this.demandes = await demandeService.getDemandesService(this.agent.id_service);
        } else if (this.fonctionAgent === 3 || this.fonctionAgent === 5) {
          this.demandes = await demandeService.getDemandesServicesDga(this.$store.state.auth.agentID);
        } else if (this.fonctionAgent === 4) {
          this.demandes = await demandeService.getDemandesDgs(this.$store.state.auth.agentID)
        }const selectedCampagne = this.campagnes.find(c => c.id_campagne === this.selectedCampagne);
      if (selectedCampagne) {
        const currentYear = new Date().getFullYear();
        const campagneYear = new Date(selectedCampagne.date_debut).getFullYear();
        this.isPreviousYear = campagneYear < currentYear;
      } else {
        this.isPreviousYear = false;
      }

    } catch (error) {
      console.error("Erreur lors de la récupération des demandes:", error);
    }
  },
    async fetchAllData() {
      await this.fetchFonctionAgent();
      await this.fetchCampagnes();
      await this.fetchDemandes();
    },
    openArbitrateDialog(id_demande, demandeName) {
      const demande = this.demandes.find(d => d.id_demande === id_demande);
      if (this.fonctionAgent === 2 && (demande.id_status >= 4 || demande.id_status >= 5)) {
        return;
      }
      this.demandeIdToArbitrate = id_demande;
      this.currentDemandeName = demandeName;
      this.showDialog = true;
      this.getDemandeById(this.demandeIdToArbitrate);
    },
    closeDialog() {
      this.showDialog = false;
      this.demandeIdToArbitrate = null;
      this.currentDemandeName = '';
      this.currentAction = null;
    },
    canArbitrate(demande) {
      const status = demande.id_status;
      const currentDate = new Date();
      const campaignEndDate = new Date(demande.date_fin);
      // si la date de fin du 
      if (campaignEndDate.getFullYear() < currentDate.getFullYear()) {
        return false; // Bloquer toutes les actions
      }
      if (this.fonctionAgent === 1) {
        return status < 2;  // id 2 peut arbitrer si status est < 2
      } else if (this.fonctionAgent === 2) {
        return status < 4;  // id 2 peut arbitrer si status est < 2
      } else if (this.fonctionAgent === 3) {
        return status < 6;  // id 3 peut arbitrer si status est < 4
      } else if (this.fonctionAgent === 4) {
        return status < 8;  // id 4 peut arbitrer si status est < 6
      } else if (this.fonctionAgent === 5) {
        return status < 10;  // id 5 peut arbitrer si status est < 8
      }
      return false;
    },
    statusClass(statusId) {
      switch (statusId) {
        case 3:
        case 5:
        case 7:
        case 9:
          return 'status-card red';
        case 2:
        case 4:
        case 6:
        case 8:
          return 'status-card green';
        case 1:
          return 'status-card gray';
        default:
          return 'status-card';
      }
    },
    async getDemandeById(id_demande) {
      try {
        const selectedDemande = await demandeService.getDemandeById(id_demande);
        this.motif_responsable = selectedDemande.motif_responsable;
        this.motif_dga = selectedDemande.motif_dga;
        this.motif_dgs = selectedDemande.motif_dgs;
        this.motif_sicig = selectedDemande.motif_sicig;
      } catch (error) {
        console.error('Erreur lors de la récupération de la demande :', error);
      }
    },
    async submitMotif() {
      try {
        let newStatus;
        switch (this.fonctionAgent) {
          case 2:
            newStatus = this.currentAction === 'valider' ? 2 : 3;
            break;
          case 3:
            newStatus = this.currentAction === 'valider' ? 4 : 5;
            break;
          case 4:
            newStatus = this.currentAction === 'valider' ? 6 : 7;
            break;
          case 5:
            newStatus = this.currentAction === 'valider' ? 8 : 9;
            break;
          default:
            throw new Error('ID de fonction invalide');
        }

        const motif = {
          motif_responsable: this.motif_responsable, 
          motif_dga: this.motif_dga, 
          motif_dgs: this.motif_dgs, 
          motif_sicig: this.motif_sicig, 
        }

        await demandeService.updateStatusDemande(this.demandeIdToArbitrate, newStatus);
        await demandeService.updateMotifDemande(this.demandeIdToArbitrate, motif)
        this.closeDialog();

        this.fetchDemandes();
      } catch (error) {
        console.error('Erreur lors de l\'arbitrage de la demande', error);
      }
    },
    prioritizeCurrentYearCampagne() {
      const currentYear = new Date().getFullYear();
      const currentYearCampagne = this.campagnes.find(campagne => {
        const campagneYear = new Date(campagne.date_debut).getFullYear();
        return campagneYear === currentYear;
      });

      if (currentYearCampagne) {
        this.campagnes = this.campagnes.filter(campagne => campagne !== currentYearCampagne);
        this.campagnes.unshift(currentYearCampagne);
        this.selectedCampagne = currentYearCampagne.id_campagne;
      }
    }
  },
  async mounted() {
    this.serviceId = this.$route.params.id_service || null;
    await this.fetchAllData();
  },
  watch: {
    '$route.params.id_service': {
      handler(newServiceId) {
        this.serviceId = newServiceId || null;
        this.fetchAllData();
      },
      immediate: true
    }
  }
}
</script>


<style scoped>
.warning-message {
  color: rgb(237 131 131);
  margin: 15px;
}
.filter-container {
  margin: 20px 0;
}

.styled-select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.styled-select:focus {
  border-color: #9281ff81;
  box-shadow: 0 0 8px #9281FF;
  outline: none;
}

.styled-select option {
  padding: 10px;
  font-size: 16px;
}

.text-supp {
  margin-bottom: 50px;
}
input, textarea{
      width: 100%;
      padding: 8px;
      margin-bottom: 20px;
      border-radius: 5px;
      box-sizing: border-box; /* Pour inclure le padding et la bordure dans la largeur totale */
      box-shadow: 0 2px 4px rgba(19, 19, 19, 0.1);
      border: 1px solid grey; /* Bordure grise */
  }
.arbitrage {
  margin-bottom: 20px;
}
.objet {
  font-weight: bold;
}
.container {
  width: 100%;
  overflow-x: auto;
  padding: 0;
}

.demandes-table {
  width: 100%;
  border-collapse: collapse;
}
th {
  color: #888;
}
td {
  color: rgb(104, 104, 104);
}
.demandes-table th,
.demandes-table td {
  padding: 20px 15px;
  border-bottom: 1px solid #ddd;
}
.demandes-table th {
  background-color: #f2f2f2;
}

.demandes-table tbody tr:hover {
  background-color: #f5f5f5;
}

.action-button {
  padding: 6px 10px;
  border: none;
  background-color: #9281ff5e;
  color: #9281FF;
  font-weight: bold;
  cursor: pointer;
  border-radius: 3px;
  padding-right: 5px;
  padding-right: 30px;
  padding-left: 30px;
}

.action-button:hover {
  background-color: #9281ff81;
}
.motift {
  margin-bottom: 10px;
}
.empty-row {
  text-align: center;
  font-style: italic;
}

.status-card {
  padding: 10px;
  font-size: 15px;
  border-radius: 15px;
  text-align: center;
  color: white;
  font-weight: bold;
}

.status-card.red {
  color: #f83030;
  background-color: #ff000046;
}

.status-card.green {
  color: #60DA00;
  background-color: #5eda003f;
}

.status-card.gray {
  color: #656262;
  background-color: #95a5a69c;
}

/* Styles pour la modale */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content-supp {
  position: relative;
  background-color: #fff;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 650px;
  height: 250px;
  border-radius: 5px;
  text-align: center;
  align-content: center;
}
.modal-content {
  position: relative;
  background-color: #fff;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 755px;
  height: 400px;
  border-radius: 5px;
  text-align: center;
  align-content: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.demande-type {
  font-size: 12px;
  color: #888;
}

.action-buttons-container-supp {
  display: flex;
  grid-template-columns: repeat(2, auto);
  gap: 5px;
  justify-content: center;
}

.action-buttons-container {
  display: flex;
  grid-template-columns: repeat(2, auto);
  gap: 5px;
  justify-content: right;
  margin-right: 50px;
}

.justificatif {
  max-width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.status {
  width: 12%;
}

.radio-input {
  display: flex;
  flex-direction: row;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
  justify-content: center;
  margin-bottom: 10px;
}

.radio-input input[type="radio"] {
  display: none;
}

.radio-input label {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #9281ff5e;
  border-radius: 5px;
  margin-right: 12px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.radio-input label:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #ccc;
  transition: all 0.3s ease-in-out;
}

.radio-input input[type="radio"]:checked + label:before {
  background-color: rgb(95, 77, 253);
  top: 0;
}

.radio-input input[type="radio"]:checked + label {
  background-color: #9281ff81;
  color: #fff;
  border-color: rgb(162, 142, 180);
  animation: radio-translate 0.5s ease-in-out;
}

@keyframes radio-translate {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateX(0);
  }
}


</style>
