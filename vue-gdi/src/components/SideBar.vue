<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
			<img src="../../../vue-gdi/src/assets/montbeliard.jpg" alt="Ville de montbéliard" :class="{ 'expanded': is_expanded }"/> 
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/" class="button">
				<span class="material-icons">home</span>
				<span class="text">Accueil</span>
			</router-link>
			<router-link to="/demandes" class="button">
				<span class="material-icons">description</span>
				<span class="text">Demandes</span>
			</router-link>
			<!-- 
			<router-link to="/demandesCard" class="button">
				<span class="material-icons">description</span>
				<span class="text">Demandes card</span>
			</router-link>
			-->
			<router-link to="/ajoutDemande" class="button">
				<span class="material-icons">add</span>
				<span class="text">Ajouter demande</span>
			</router-link>

			<button v-if="fonctionAgent >= 3" class="button" @click="toggleServiceDropdown">
		    	<span class="material-icons">menu</span>
		    	<span class="text">Valider service</span>
			</button>
			
			<ul v-if="showServiceDropdown" class="service-dropdown">
    			<router-link class="button" v-for="service in agentServices" :key="service.id_service" :to="`/demandesService/${service.id_service}`">
    			    <li>{{ is_expanded ? service.nom_service : service.sigle }}</li>
    			</router-link>
			</ul>
			<button class="button" v-if="isAuthenticated" @click="handleLogout">
				<span class="material-icons">logout</span>
                <span class="text">Déconnexion</span>
			</button>
			
		</div>
	</aside>
</template>

<script>
import { ref } from 'vue';
import { agentService } from '@/services/agent.service';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
	data() {
		return {
            fonctionAgent: 0,
            showServiceDropdown: false,
            agentServices: []
        }
	},
  setup() {
    const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
    const showServiceDropdown = ref(false); // Déclaration de la variable reactive showServiceDropdown

    const ToggleMenu = () => {
      is_expanded.value = !is_expanded.value;
      localStorage.setItem("is_expanded", is_expanded.value.toString()); // convertit la valeur en chaîne de caractères
    }

	const toggleServiceDropdown = () => {
        showServiceDropdown.value = !showServiceDropdown.value; 
    }

    // Retourne les valeurs et fonctions nécessaires dans le setup
    return {
      is_expanded,
      ToggleMenu,
	  toggleServiceDropdown,
	  showServiceDropdown 
    };
  },
  name: 'SideBar',
  components: {},
  computed: {
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout']),

    async handleLogout() {
      await this.logout();
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/');
      }
    },
	async fetchFonctionAgent() {
        try {
            const agentID = this.$store.state.auth.agentID;
            const fonctionResponse = await agentService.getDetailsAgent(agentID);
            this.fonctionAgent = fonctionResponse.id_fonction;
			if (this.fonctionAgent === 3) {
                this.agentServices = await agentService.getAgentServices(agentID);
            }
			if (this.fonctionAgent >= 4) {
                this.agentServices = await agentService.getServicesByDgs(agentID);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des demandes de l'agent:", error);
        }
    },
  },
  mounted() {
	this.fetchFonctionAgent()
  }
}

</script>



<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;

	background-color: var(--dark);
	color: var(--light);


	// taille de la sidebar non extend
	width: calc(2rem + 50px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}
	.logo img.expanded {
    width: calc(var(--sidebar-width) - 10rem); 
}
	.logo {
		margin-bottom: 1rem;

    	img {
			width: 100%;
       		transition: width 0.2s ease-in-out; 
    	}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: #777777;
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: #777777;
				transition: 0.2s ease-in-out;
			}
			.text {
				font-size: 16px;
				color: #777777;
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: var(--dark-alt);

				.material-icons, .text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons, .text {
					color: var(--primary);
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.is-expanded {

		.menu-toggle-wrap {
			top: -3rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3, .button .text {
			opacity: 1;
			font-weight: bold;

		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}
}

.service-dropdown {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease; 
		color: #777777; 

        &:hover {
            color: var(--primary); 
        }
    }
}

aside.is-expanded {
    width: 225px;
}
</style>