<template>
  <div class="container">
    <h1>Ajouter une demande</h1>
    <form @submit.prevent="ajouterDemande" enctype="multipart/form-data">
      <div class="groupe">
        <div class="textg">
          <label>CAMPAGNE BUDGETAIRE</label>
          <select v-model="id_campagne">
            <option disabled selected value="">Sélectionnez la campagne</option>
            <option v-for="campagne in filteredCampagnes" :key="campagne.id_campagne" :value="campagne.id_campagne">{{ campagne.nom_campagne }}</option>
          </select>
        </div>

        <div class="textg">
          <label v-if="this.fonctionAgent >= 3">SERVICE</label>
          <select v-if="this.fonctionAgent >= 3" v-model="id_service">
            <option disabled selected value="">Sélectionnez le service</option>
            <option v-for="service in services" :key="service.id_service" :value="service.id_service">{{ service.nom_service }}</option>
          </select>
        </div>
      </div>

      <label>OBJET</label>
      <input placeholder="Objet de la demande" type="text" id="objet" v-model="objet" />

      <div class="groupe">
        <div class="textg">
          <label>TYPE DE DEMANDE</label>
          <select v-model="id_type">
            <option disabled selected value="">Sélectionnez le type de demande</option>
            <option v-for="type_demande in types" :key="type_demande.id_type" :value="type_demande.id_type">{{ type_demande.nom_type }}</option>
          </select>
        </div>

        <div class="textg">
          <label>PRIORITE</label>
          <select v-model="id_priorite">
            <option disabled selected value="">Sélectionnez le niveau de priorité</option>
            <option v-for="priorite in priorites" :key="priorite.id_priorite" :value="priorite.id_priorite">{{ priorite.nom_priorite }}</option>
          </select>
        </div>
      </div>

      <label>JUSTIFICATIF</label>
      <textarea placeholder="Justifier la demande" id="justificatif" v-model="justificatif"></textarea>

      <div class="groupe">
        <div class="textg">
          <label>CHEF DE PROJET PRESENTI (COTE SERVICE DEMANDEUR)</label>
          <input placeholder="Nom CPU" type="text" id="cpu" v-model="cpu" />
        </div>
        <div class="textg">
          <label>BUDGET ESTIMATIF</label>
          <input placeholder="Si possible entrer un budget estimatif" type="number" id="budget_estimatif" min="0" v-model="budget_estimatif" />
        </div>
      </div>

      <label class="filetitle">Si vous le souhaitez, vous pouvez ajouter une pièce jointe</label>
      <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
        <div>{{ message }}</div>
      </div>
      <div class="field">
        <div>
          <label>
            <input type="file" ref="files" @change="selectFile" />
          </label>
        </div>
      </div>

      <div>
              <div v-for="(file, index) in files" :key="index" :class="`level ${file.invalidMessage && 'has-text-danger'}`">
                  <div>
                      <div class="file-item">
                          <a class="file-download">{{ file.name }}</a>
                          <span v-if="file.invalidMessage">&nbsp;- {{ file.invalidMessage }}</span> 
                          <button @click.prevent="removeFile(index)">
                              <i class="material-icons">cancel</i>
                          </button >
                      </div>
                  </div>
                  <div>
                  </div>
              </div>
          </div>

      <br/>
      <button type="submit" class="action-button">Ajouter</button>
    </form>
  </div>
</template>

<script>
import demandeService from '@/services/demande.service';
import fileService from '@/services/file.service';
import { agentService } from '@/services/agent.service';
import typeService from '@/services/type.service';
import prioriteService from '@/services/priorite.service';
import campagneService from '@/services/campagne.service';
import serviceService from '@/services/service.service';
import _ from 'lodash';
import axiosMarche from '../services/axios.service'
export default {
  data() {
    return {
      fonctionAgent: 0,
      agent: [],
      services: [],
      types: [],
      priorites: [],
      campagnes: [],
      objet: '',
      justificatif: '',
      cpu: '',
      budget_estimatif: 0,
      transmition_dga: false,
      date_transmission_dga: null,
      date_creation: new Date().toISOString().slice(0, 10),
      transmition_dgs: false,
      date_transmission_dgs: null,
      date_limite_validation: null,
      id_service: null,
      id_priorite: null,
      id_status: 1,
      id_type: null,
      id_campagne: null,
      id_agent: null,

      files: [],
      uploadFiles: [],
      message: "",
      error: false,
      uploadedFiles: [],

      nom_file: '',
      upload_date: new Date().toISOString().slice(0, 10),
      nom_file_2: '',
      filePath: '',
      id_demande: null,

    };
  },
  computed: {
    filteredCampagnes() {
      const currentYear = new Date().getFullYear();
      return this.campagnes.filter(campagne => new Date(campagne.date_debut).getFullYear() >= currentYear);
    }
  },
  methods: {
    // File upload
    removeFile(index) {
      this.files.splice(index, 1); 
      this.uploadFiles.splice(index, 1);
      this.nom_file = ''; 
    },
    selectFile() {
      // prend le fichier qui est dans la ref file du input
      const file = this.$refs.files.files[0];
      if (file) {
        this.files = [{
          // met les infos de la file dans des variables de files
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file)
        }];
        this.uploadFiles = [file]; 
        this.nom_file = file.name; 
      }
    },
    validate(file) {
      // const MAX_SIZE = 200000;
      // Les extensions autorisé
      const allowedTypes = [
        "image/jpeg", 
        "image/png", 
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", 
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/html",
        "text/plain",
        "application/zip",
    ];
      // if (file.size > MAX_SIZE) {
      //   return `MAX SIZE : ${MAX_SIZE / 1000}Kb`;
      // }
      if (!allowedTypes.includes(file.type)) {
        return "Fichié invalide";
      }
      return "";
    },
    async sendFile() {
      const formData = new FormData();
      formData.append('id_demande', this.id_demande);
      _.forEach(this.uploadFiles, file => {
        if (this.validate(file) === "") {
          formData.append('files', file);
        }
      });
      try {
        const response = await axiosMarche.post('/upload', formData);
        this.uploadedFiles = response.data.files;

        
        if (this.uploadedFiles.length > 0) {
          this.nom_file_2 = this.uploadedFiles[0].fileName;
          this.filePath = this.uploadedFiles[0].filePath;
        }

        const file = {
          nom_file: this.nom_file,
          upload_date: this.upload_date,
          nom_file_2: this.nom_file_2,
          filePath: this.filePath,
          id_demande: this.id_demande,
        };

        await fileService.createFileDemande(file);
        this.message = "FILES BIEN MISESSS";
        this.files = [];
        this.uploadFiles = [];
      } catch (err) {
        this.message = err.response.data.error;
        this.error = true;
      }
    },

    // Fetch les infos pour la demande
    async fetchFonctionAgent() {
      try {
        const agentID = this.$store.state.auth.agentID;
        const fonctionResponse = await agentService.getDetailsAgent(agentID);
        this.fonctionAgent = fonctionResponse.id_fonction;
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes de l'agent:", error);
      }
    },
    async fetchServices() {
      try {
        const agentID = this.$store.state.auth.agentID;
        if (this.fonctionAgent === 3 || this.fonctionAgent === 5) {
          const servicesResponse = await serviceService.getAllServicesByDga(agentID); 
          this.services = servicesResponse;
        } else if (this.fonctionAgent === 4) {
          const servicesResponse = await agentService.getServicesByDgs(agentID)
          this.services = servicesResponse;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des services :", error);
      }
    },
    async fetchTypes() {
      try {
        const typesResponse = await typeService.getTypesDemande();
        this.types = typesResponse;
      } catch (error) {
        console.error("Erreur lors de la récupération des types de demande :", error);
      }
    },
    async fetchPriorites() {
      try {
        const prioritesResponse = await prioriteService.getPrioritesDemande();
        this.priorites = prioritesResponse;
      } catch (error) {
        console.error("Erreur lors de la récupération des priorités :", error);
      }
    },
    async fetchCampagnes() {
      try {
        const typesResponse = await campagneService.getCampagnesBudgetaire();
        this.campagnes = typesResponse;
      } catch (error) {
        console.error("Erreur lors de la récupération des campagnes:", error);
      }
    },
    async fetchServiceAgent() {
      try {
        const agentID = this.$store.state.auth.agentID;
        const serviceResponse = await agentService.getServiceAgent(agentID);
        this.agent = serviceResponse;
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes de l'agent:", error);
      }
    },
    // Ajouter la demande
    async ajouterDemande() {
      try {
        if (this.fonctionAgent < 3) {
          await this.fetchServiceAgent();
          this.id_agent = this.agent.id_agent;
          this.id_service = this.agent.id_service;
        } else {
          const agentID = this.$store.state.auth.agentID;
          this.id_agent = agentID;
        }

        const nouvelleDemande = {
          objet: this.objet,
          justificatif: this.justificatif,
          cpu: this.cpu,
          budget_estimatif: this.budget_estimatif,
          date_creation: this.date_creation,
          transmition_dga: this.transmition_dga,
          date_transmission_dga: this.date_transmission_dga,
          transmition_dgs: this.transmition_dgs,
          date_transmission_dgs: this.date_transmission_dgs,
          date_limite_validation: this.date_limite_validation,
          id_service: this.id_service,
          id_priorite: this.id_priorite,
          id_campagne: this.id_campagne,
          id_status: this.id_status,
          id_type: this.id_type,
          id_agent: this.id_agent,
        };
        
        const response = await demandeService.createDemande(nouvelleDemande);
        this.id_demande = response.data.id_demande;

        if (this.uploadFiles.length > 0) {
          await this.sendFile();
        }
        this.$router.push('/demandes');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la demande :', error);
      }
    },
  },
  async mounted() {
    await this.fetchFonctionAgent();
    await this.fetchServices();
    await this.fetchPriorites();
    await this.fetchTypes();
    await this.fetchCampagnes();
    await this.fetchServiceAgent();
  }
};
</script>

  <style scoped>
  h1 {
	  color: gray;
	  font-size: larger;
  }

  .container {
    width: 100%;
    padding: 30px;
  }
  
  form {
    margin-top: 20px;
  }
  
  label {
    display: block;
    color: grey;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-sizing: border-box; /* Pour inclure le padding et la bordure dans la largeur totale */
    box-shadow: 0 2px 4px rgba(19, 19, 19, 0.1);
    border: 1px solid grey; /* Bordure grise */
  }
  
.file {
  width: 300px;
}
.filetitle {
  width: 500px;
}
.file-item {
      display: flex;
      align-items: center;
  }

  .file-download {
    margin-right: 40px;
  }
  .groupe {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .textg {
    flex: 1;
    margin-right: 15px; /* Espacement entre les éléments */
    min-width: calc(50% - 15px); /* Largeur minimum pour bien s'ajuster avec l'espacement */
  }
  
  .textg:last-child {
    margin-right: 0;
  }
  
  .action-button {
    padding: 8px 15px;
    border: none;
    background-color: #9281ff5e;
    color: #9281FF;
    font-weight: bold;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .action-button:hover {
    background-color: #9281ff81;
  }
  </style>