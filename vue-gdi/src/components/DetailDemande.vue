<template>
    <div class="container">
      <h1>Aperçu de la <b>demande</b></h1>
  
      <form>
        <div class="groupebudge">
          <div class="textg">
            <label>CAMPAGNE BUDGETAIRE</label>
              <p>{{ getCampagneName(id_campagne) }}</p>
          </div>
        </div>

        <label for="objet">OBJET</label>
        <p>{{ objet }}</p>
  
        <div class="groupe">
          <div class="textg">
            <label>TYPE DE DEMANDE</label>
            <p>{{ getTypeName(id_type) }}</p>
          </div>

          <div class="textg">
            <label>PRIORITE</label>
              <p>{{ getPrioriteName(id_priorite) }}</p>
          </div>
        </div>

        <label for="justificatif">JUSTIFICATIF</label>
        <p>{{ justificatif }}</p>

        <div class="groupe">
          <div class="textg">
            <label for="cpu">CHEF DE PROJET PRESENTI (COTE SERVICE DEMANDEUR)</label>
            <p>{{ cpu }}</p>
          </div>
          <div class="textg">
            <label for="budget_estimatif">BUDGET ESTIMATIF</label>
            <p>{{ budget_estimatif }}</p>
          </div>
        </div>

        <div class="groupe">
          <div class="textg">
            <label for="avis_responsable">AVIS RESPONSABLE</label>
            <p>{{ avis_responsable }}</p>
          </div>
          <div class="textg">
            <label for="motif_responsable">MOTIF RESPONSABLE</label>
            <p>{{ motif_responsable }}</p>
          </div>
        </div>

        <div class="groupe">
          <div class="textg">
            <label for="avis_dga">AVIS DGA</label>
            <p>{{ avis_dga }}</p>
          </div>
          <div class="textg">
            <label for="motif_dga">MOTIF DGA</label>
            <p>{{ motif_dga }}</p>
          </div>
        </div>

        <div class="groupe">
          <div class="textg">
            <label for="avis_dgs">AVIS DGS</label>
            <p>{{ avis_dgs }}</p>
          </div>
          <div class="textg">
            <label for="motif_dgs">MOTIF DGS</label>
            <p>{{ motif_dgs }}</p>
          </div>
        </div>

        <div class="groupe">
          <div class="textg">
            <label for="avis_sicig">AVIS SICIG</label>
            <p>{{ avis_sicig }}</p>
          </div>
          <div class="textg">
            <label for="motif_sicig">MOTIF SICIG</label>
            <p>{{ motif_sicig }}</p>
          </div>
        </div>

        <br>
        <div v-if="files.length > 0">
          <label class="filetitle" for="piece_jointe">Pièce jointe</label>
          <div class="file-item" v-for="file in files" :key="file.id_file">
            <a :href="`http://localhost:3030/uploads/${id_demande}/${file.nom_file_2}`" :download="file.nom_file">{{ file.nom_file }}</a>
          </div>
        </div>
      <br>
        <button type="button" @click="annuler" class="action-button">Retour</button>
      </form>
    </div>
  </template>
  
  <script>
  import demandeService from '@/services/demande.service';
  import typeService from '@/services/type.service';
  import prioriteService from '@/services/priorite.service';
  import campagneService from '@/services/campagne.service';
  import fileService from '@/services/file.service';
  
  export default {
    data() {
      return {
        types: [],
        priorites: [],
        campagnes: [],
        files: [],
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
        motif_sicig: ''
      };
    },
    methods: {
      annuler() {
        this.$router.go(-1);
      },
      async fetchFiles(){
        try {
          const filesResponse = await fileService.getFilesByIdDemande(this.id_demande);
          this.files = filesResponse;
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
      getTypeName(id_type) {
        const type = this.types.find(type => type.id_type === id_type);
        return type ? type.nom_type : '';
      },
      getPrioriteName(id_priorite) {
        const priorite = this.priorites.find(priorite => priorite.id_priorite === id_priorite);
        return priorite ? priorite.nom_priorite : '';
      },
      getCampagneName(id_campagne) {
        const campagne = this.campagnes.find(campagne => campagne.id_campagne === id_campagne);
        return campagne ? campagne.nom_campagne : '';
      },
    },
    mounted() {
      this.fetchPriorites();
      this.fetchTypes();
      this.fetchCampagnes();
      this.getDemandeById();
      this.fetchFiles();
    }
  };
  </script>
  
  <style scoped>

.container {
    width: 100%;
    padding: 30px;
  }
  
  button {
    margin-top: 25px;
    margin-right: 15px;
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
  
  p {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
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

  h1 {
	  color: gray;
	  font-size: larger;
  }
  
  form {
    margin-top: 20px;
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
  margin-bottom: 10px;
}
.file-item {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
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
  
  </style>
  