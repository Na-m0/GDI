<template>
  <div class="container">
      <h1>Mettre à jour une <b>demande</b></h1>

      <form @submit.prevent="updateDemande">

          <div class="groupebudge">
              <div class="textg">
                  <label>CAMPAGNE BUDGETAIRE</label>
                  <select v-model="id_campagne">
                      <option disabled selected value="">Sélectionnez la campagne</option>
                      <option v-for="campagne in filteredCampagnes" :key="campagne.id_campagne" :value="campagne.id_campagne">{{ campagne.nom_campagne }}</option>
                  </select>
              </div>
          </div>

          <label>OBJET</label>
          <input type="text" id="objet" v-model="objet">

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
          <textarea id="justificatif" v-model="justificatif"></textarea>

          <div class="groupe">
              <div class="textg">
                  <label>CHEF DE PROJET PRESENTI (COTE SERVICE DEMANDEUR)</label>
                  <input type="text" id="cpu" v-model="cpu">
              </div>
              <div class="textg">
                  <label>BUDGET ESTIMATIF</label>
                  <input type="number" id="budget_estimatif" min="0" v-model="budget_estimatif">
              </div>
          </div>

          <div class="groupe">
            <div class="textg" v-if="fonctionAgent === 2">
              <label>AVIS RESPONSABLE</label>
              <input type="text" id="avis_responsable" v-model="avis_responsable">
            </div>
            <div class="textg" v-if="fonctionAgent === 3">
              <label>AVIS DGA</label>
              <input type="text" id="avis_dga" v-model="avis_dga">
            </div>
            <div class="textg" v-if="fonctionAgent === 4">
              <label>AVIS DGS</label>
              <input type="text" id="avis_dgs" v-model="avis_dgs">
            </div>
            <div class="textg" v-if="fonctionAgent === 5">
              <label>AVIS SICIG</label>
              <input type="text" id="avis_sicig" v-model="avis_sicig">
            </div>
          </div>

          <!--LISTE DES FICHIERS-->
          <div v-if="filesList.length > 0">
              <label class="filetitle">Pièces jointes téléchargées :</label>
              <div class="file-list">
                  <div v-for="file in filesList" :key="file.id_file" class="file-item">
                      <a class="file-download" :href="`http://localhost:3030/uploads/${id_demande}/${file.nom_file_2}`" :download="file.nom_file">{{ file.nom_file }}</a>
                      <button @click.prevent="deleteFile(file.id_file)" class="material-icons" >cancel</button>
                  </div>
              </div>
          </div>

          <!--AJOUT DE FICHIERS-->
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

          <br>        
          <button type="submit" class="action-button">Mettre à jour</button>
          <button type="button" @click="annuler" class="action-button">Annuler</button>
      </form>
  </div>
</template>
  
  <script>
  import demandeService from '@/services/demande.service';
  import typeService from '@/services/type.service';
  import prioriteService from '@/services/priorite.service';
  import campagneService from '@/services/campagne.service';
  import fileService from '@/services/file.service';
  import { agentService } from '@/services/agent.service';
  import _ from 'lodash';
  import axiosMarche from '../services/axios.service'

  export default {
    data() {
      return {
        types: [],
        priorites: [],
        campagnes: [],
        id_demande: '',
        objet: '',
        justificatif: '',
        cpu: '',
        budget_estimatif: '',
        id_type: '',
        id_priorite: '',
        id_service: '',
        id_status: '',
        id_campagne: '',
        id_agent: '',
        avis_responsable: '',
        avis_dga: '',
        avis_dgs: '',
        avis_sicig: '', 
        motif_responsable: '', 
        motif_dga: '', 
        motif_dgs: '', 
        motif_sicig: '',

        fonctionAgent: 0,

        filesList: [],

        files: [],
        uploadFiles: [],
        message: "",
        error: false,
        uploadedFiles: [],

        nom_file: '',
        upload_date: new Date().toISOString().slice(0, 10),
        nom_file_2: '',
        filePath: '',
      };
    },
    computed: {
    filteredCampagnes() {
      const currentYear = new Date().getFullYear();
      return this.campagnes.filter(campagne => new Date(campagne.date_debut).getFullYear() >= currentYear);
    }
  },
    methods: {
        annuler() {
            this.$router.go(-1);
        },
        // File upload
        removeFile(index) {
          this.files.splice(index, 1); 
          this.uploadFiles.splice(index, 1);
          this.nom_file = ''; 
        },
        selectFile() {
          const file = this.$refs.files.files[0];
          if (file) {
            this.files = [{
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
          formData.append('id_demande', this.id_demande); // Ajoutez l'ID de la demande au FormData
          _.forEach(this.uploadFiles, file => {
            if (this.validate(file) === "") {
              formData.append('files', file);
            }
          });
          try {
            const response = await axiosMarche.post('/upload', formData);
            this.uploadedFiles = response.data.files;
            
            // Assigner le nom du fichier à nom_file_2
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

        async deleteFile(id_file) {
          try {
            await fileService.deleteFile(id_file);
            this.filesList = this.filesList.filter(file => file.id_file !== id_file);
            this.message = "Fichier supprimé avec succès";
            this.error = false;
          } catch (error) {
            this.message = "Erreur lors de la suppression du fichier";
            this.error = true;
            console.error('Erreur lors de la suppression du fichier :', error);
          }
        },

        async fetchFonctionAgent() {
          try {
            const agentID = this.$store.state.auth.agentID;
            const fonctionResponse = await agentService.getDetailsAgent(agentID);
            this.fonctionAgent = fonctionResponse.id_fonction;
          } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'agent:", error);
          }
        },
        async fetchFiles(){
          try {
            const filesResponse = await fileService.getFilesByIdDemande(this.id_demande);
            this.filesList = filesResponse;
          } catch (error) {
            console.error("Erreur lors de la récupération des types de demande :", error);
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
            console.error("Erreur lors de la récupération des prioritées :", error);
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
        async getDemandeById() {
            this.id_demande = this.$route.params.id_demande;
            try {
                const selectedDemande = await demandeService.getDemandeById(this.id_demande);
                this.objet = selectedDemande.objet;
                this.justificatif = selectedDemande.justificatif;
                this.cpu = selectedDemande.cpu;
                this.budget_estimatif = selectedDemande.budget_estimatif;
                this.id_type = selectedDemande.id_type;
                this.id_priorite = selectedDemande.id_priorite;
                this.id_service = selectedDemande.id_service;
                this.id_status = selectedDemande.id_status;
                this.id_campagne = selectedDemande.id_campagne;
                this.id_agent = selectedDemande.id_agent;
                this.avis_responsable = selectedDemande.avis_responsable;
                this.avis_dga = selectedDemande.avis_dga;
                this.avis_dgs = selectedDemande.avis_dgs;
                this.avis_sicig = selectedDemande.avis_sicig;
                this.motif_responsable = selectedDemande.motif_responsable;
                this.motif_dga = selectedDemande.motif_dga;
                this.motif_dgs = selectedDemande.motif_dgs;
                this.motif_sicig = selectedDemande.motif_sicig;
            } catch (error) {
                console.error('Erreur lors de la récupération de la demande :', error);
            }
        },
      async updateDemande() {
        try {
          const updatedDemande = {
            id_demande: this.id_demande,
            objet: this.objet,
            justificatif: this.justificatif,
            cpu: this.cpu,
            budget_estimatif: this.budget_estimatif,
            id_type: this.id_type,
            id_priorite: this.id_priorite,
            id_service: this.id_service,
            id_status: this.id_status,
            id_campagne: this.id_campagne,
            id_agent: this.id_agent,
            avis_responsable: this.avis_responsable,
            avis_dga: this.avis_dga,
            avis_dgs: this.avis_dgs,
            avis_sicig: this.avis_sicig, 
            motif_responsable: this.motif_responsable, 
            motif_dga: this.motif_dga, 
            motif_dgs: this.motif_dgs, 
            motif_sicig: this.motif_sicig
          };
          await demandeService.updateDemande(this.id_demande, updatedDemande);

          if (this.uploadFiles.length > 0) {
            await this.sendFile();
          }
          this.$router.push('/demandes');

        } catch (error) {
          console.error('Erreur lors de la mise à jour de la demande :', error);
        }
      },
    },
    mounted() {
      this.fetchFonctionAgent()
      this.fetchPriorites()
      this.fetchTypes()
      this.fetchCampagnes()
      this.getDemandeById()
      this.fetchFiles()
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

  .file-list {
      display: flex;
      flex-direction: column;
  }

  .file-item {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
  }

  .file-download {
    margin-right: 40px;
  }
  .delete-button {
      background-color: #ff6b6b;
      color: white;
      border: none;
      border-radius: 3px;
      padding: 5px 10px;
      cursor: pointer;
  }

  .delete-button:hover {
      background-color: #ff4747;
  }

  .groupe {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
  }
  .groupebudge {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
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
      margin-right: 15px;
  }

  .action-button:hover {
      background-color: #9281ff81;
  }
</style>