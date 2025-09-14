// index.js du router
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import Demandes from '../components/Demandes.vue';
import UpdateDemande from '../components/UpdateDemande.vue';
import AjoutDemande from '../components/AjoutDemande.vue';
import DetailDemande from '../components/DetailDemande.vue';
import ProfilAgent from '../components/ProfilAgent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView 
  },
  {
    path: '/demandes',
    name: 'Demandes',
    component: Demandes
  },
  {
    path: '/demandesService/:id_service',
    name: 'DemandesService',
    component: Demandes
  },
  {
    path: '/updateDemande/:id_demande',
    name: 'UpdateDemande',
    component: UpdateDemande,
  },
  {
    path: '/detailDemande/:id_demande',
    name: 'detailDemande',
    component: DetailDemande
  },
  {
    path: '/ajoutDemande',
    name: 'AjoutDemande',
    component: AjoutDemande
  },
  {
    path: '/profilAgent/:id_agent',
    name: 'ProfilAgent',
    component: ProfilAgent
  },
  {
    path: '/:pathMatch(.*)*', component: NotFoundView,
    name: 'NotFound',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
