<template>
<div>
    <div class="all">
        <!--<div class="container service">
            <div class="profile-header">
                <h1 v-if="fonctionAgent < 3" class="text">id service : {{ agent.id_service }}</h1>
                <h1 v-if="fonctionAgent >= 3" class="text">id agent : {{ agent.id_agent }}</h1>
            </div>
        </div>
        -->
                <!-- Contenu du premier conteneur (Bienvenue) -->
        <div class="container service">
            <div class="profile-header">
                <h1 v-if="fonctionAgent < 3" class="text">Bienvenue sur le {{ agent.nom_service }}</h1>
                <h1 v-if="fonctionAgent >= 3" class="text">Bienvenue {{ agent.nom_agent }}</h1>
                <img src="../assets/work.png" alt="Monsieur" class="person-image">
            </div>
            <div class="profile-header">
                <p class="soutext">Dites adieu aux soucis de gestion des demandes informatiques sur un fichier Excel obsolète ! 
                    Décrouvrez notre nouvel outil web ultra-moderne, 
                    conçu pour simplifier et optimiser votre processus de gestion.</p>
            </div>
        </div>
                <!-- Contenu du deuxième conteneur (Budget estimé) -->
        <div class="container">
            <div class="profile-header">
                <i class="fab fa-paypal containerpaypal"></i>
                <h2>Budget estimé</h2>
                <h3>{{ sommeBudgets }} €</h3>
            </div>
        </div>
                <!-- Contenu du troisième conteneur (Demandes) -->
        <div class="container containerDemande">
            <div class="profile-header">
                <i class="fas fa-file-alt dossier-icon containerdemande"></i>
                <h2>Demandes</h2>
                <h3>{{ demandes.length }}</h3>
            </div>
        </div>
    </div>
    <!-- Contenu du quatrième conteneur (Status demandes) -->
    <div class="container status">
        <div class="profile-header">
            <h4>Statut des demandes</h4>
            <div class="status-line-1">
                <i class="fas fa-clock container-icon pending-icon"></i>
                <div class="status-text">
                    <h5>En attente</h5>
                </div>
                <span class="status-number">{{ enAttente }}</span>
            </div>
            <div class="status-line">
                <i class="fas fa-check-circle container-icon valid-icon"></i>
                <div class="status-text">
                    <h5>Validées</h5>
                    <p class="par">par le responsable</p>
                </div>
                <span class="status-number">{{ validees1 }}</span>
            </div>
            <div class="status-line">
                <i class="fas fa-times-circle container-icon refused-icon"></i>
                <div class="status-text">
                    <h5>Refusées</h5>
                    <p class="par">par le responsable</p>
                </div>
                <span class="status-number">{{ refusees1 }}</span>
            </div>
            <div class="status-line">
                <i class="fas fa-check-circle container-icon valid-icon"></i>
                <div class="status-text">
                    <h5>Validées</h5>
                    <p class="par">par le DGA</p>
                </div>
                <span class="status-number">{{ validees2 }}</span>
            </div>
            <div class="status-line">
                <i class="fas fa-times-circle container-icon refused-icon"></i>
                <div class="status-text">
                    <h5>Refusées</h5>
                    <p class="par">par le DGA</p>
                </div>
                <span class="status-number">{{ refusees2 }}</span>
            </div>
            <div class="status-line">
                <i class="fas fa-check-circle container-icon valid-icon"></i>
                <div class="status-text">
                    <h5>Validées</h5>
                    <p class="par">par le DGS</p>
                </div>
                <span class="status-number">{{ validees3 }}</span>
            </div>
            <div class="status-line">
                <i class="fas fa-times-circle container-icon refused-icon"></i>
                <div class="status-text">
                    <h5>Refusées</h5>
                    <p class="par">par le DGS</p>
                </div>
                <span class="status-number">{{ refusees3 }}</span>
            </div>
            <div class="status-line">
                <i class="fas fa-check-circle container-icon valid-icon"></i>
                <div class="status-text">
                    <h5>Validées</h5>
                    <p class="par">par le SICIG</p>
                </div>
                <span class="status-number">{{ validees4 }}</span>
            </div>
            <div class="status-line">
                <i class="fas fa-times-circle container-icon refused-icon"></i>
                <div class="status-text">
                    <h5>Refusées</h5>
                    <p class="par">par le SICIG</p>
                </div>
                <span class="status-number">{{ refusees4 }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { agentService } from '@/services/agent.service';
import demandeService from '@/services/demande.service';

export default {
    data() {
        return {
            demandes: [],
            fonctionAgent: 0,
            agent: [],
            sommeBudgets: 0,
            nbdemande: [],
            status: [],
            enAttente: 0,
            validees1: 0,
            refusees1: 0,
            validees2: 0,
            refusees2: 0,
            validees3: 0,
            refusees3: 0,
            validees4: 0,
            refusees4: 0
        }
    },
    computed: {
        ...mapState('auth', ['agentID']),
        ...mapGetters('auth', ['isAuthenticated']),
        
    },
    methods: {
        async fetchDemandesService() {
            try {
                const agentID = this.$store.state.auth.agentID;
                const serviceResponse = await agentService.getDetailsAgent(agentID);
                this.fonctionAgent = serviceResponse.id_fonction;
                if (this.fonctionAgent < 3) {
                    const serviceResponse = await agentService.getServiceAgent(agentID);
                    this.agent = serviceResponse;
                    const serviceId = this.agent.id_service
                    this.demandes = await demandeService.getDemandesService(serviceId);
                    this.sommeBudgets = await demandeService.getSumBudgetByServiceId(serviceId);   
                }
                else {
                    const serviceResponse = await agentService.getDetailsAgent(agentID);
                    this.agent = serviceResponse;
                    this.demandes = await demandeService.getDemandesServicesDga(agentID)
                    this.sommeBudgets = await demandeService.getSumBudgetByDgaId(agentID)
                }  
            } catch (error) {
                console.error("Erreur lors de la récupération des demandes de l'agent:", error);
            }
        },
        
        async getNombreDemandes(statusId) {
            try {
                if(this.fonctionAgent < 3) {
                    const agentID = this.$store.state.auth.agentID;
                    const serviceResponse = await agentService.getServiceAgent(agentID);
                    this.nbdemande = serviceResponse;
                    const serviceId = this.nbdemande.id_service;
                    const response = await demandeService.getNombreDemandesByStatus(statusId, serviceId);
                    return response.nombre_demandes;
                }
                else {
                    const agentID = this.$store.state.auth.agentID;
                    const response = await demandeService.getNombreDemandesByStatutAndDga(statusId, agentID);
                    return response.nombre_demandes;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du nombre de demandes pour le statut:", error);
                return 0;
            }
        }
    },
    async mounted() {
        try {
            await this.fetchDemandesService();

            // on crée un tableau pour stocker les demandes par statut
                const promises = [];
                // on fait ensuite une boucle afin de parcourir chaque id de statut
                for (let i = 1; i <= 9; i++) {
                    promises.push(this.getNombreDemandes(i));
                }
                // on attend bien que toutes les boucles pour les statuts soit effectué 
                const results = await Promise.all(promises);

                // et on met à jour les variables avec les résultats obtenus
                this.enAttente = results[0] || 0;
                this.validees1 = results[1] || 0;
                this.refusees1 = results[2] || 0;
                this.validees2 = results[3] || 0;
                this.refusees2 = results[4] || 0;
                this.validees3 = results[5] || 0;
                this.refusees3 = results[6] || 0;
                this.validees4 = results[7] || 0;
                this.refusees4 = results[8] || 0;
            
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    },
};
</script>


<style scoped>
.container.status {
    width: 30rem; /* Ajustez la largeur selon vos besoins */
}
.container-icon {
    font-size: 15px;
    margin-right: 15px;
}

.pending-icon {
    background-color: #a5a5a565;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: rgb(138, 138, 138);
}

.valid-icon {
    background-color: #59ee4b65;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: rgb(58, 204, 58);
}

.refused-icon {
    background-color: #dd3f3f65;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: rgb(204, 58, 58);
}

.service {
    width: 50%;
}

.container {
    margin-right: 4%;
    float: left;
    padding-bottom: 10px;
}

.fab.fa-paypal {
    font-size: 20px;
    color: #eeb03e; 
}

.containerpaypal {
    background-color: #eeb03e65;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dossier-icon {
    font-size: 20px;
    color: #007bff;
}

.containerdemande {
    background-color: #5495f765;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
    font-size: 25px;
    color: #716d7c;
}

h4 {
    font-size: 18px;
    color: #8b898d;
    margin-bottom: 17px;
}

h5 {
    font-size: 15px;
    color: #8b898d;
    margin-bottom: 5px;
}

h2 {
    font-size: 15px;
    color: #a7a6a8;
    margin-bottom: 17px;
    margin-right: 55px; 
}

span {
    color: grey;
}

.profile-header h1 {
    font-size: 24px;
    margin-bottom: 5px;
}

.profile-header .text {
    font-size: 18px;
    color: #9f7fff;
    margin-right: 10px; 
    margin-bottom: 17px;
}

.all {
    overflow: hidden; 
}

.person-image {
    width: 160px; 
    height: auto; 
    float: right; 
}

.status-line {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
}

.status-line-1 {
    display: flex;
    align-items: baseline;
}

.status-text {
    display: flex;
    flex-direction: column; /* Afficher les enfants en colonne */
}
.status-number {
    margin-left: auto;
}

.par{
    font-size: 12px;
}
</style>