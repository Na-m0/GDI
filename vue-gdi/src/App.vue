<template>
	<div>
	  <div v-if="!isAuthenticated" class="login">
		<LoginView/>
	  </div>
	  <div v-if="isAuthenticated" class="home">
		<SideBar/>
		<div class="cont">
		  	<div class="container containertitre">
				<div class="titre-container">
            		<h1 class="titre">GESTION DES DEMANDES INFORMATIQUES</h1>
            		<div class="dropdown">
            		  <button class="button" @click="toggleDropdown">
            		    <span class="material-icons">settings</span>
            		  </button>
            		  <div v-if="showDropdown" class="dropdown-menu">
            		    <button class="menu" @click="goToProfile">Profil</button>
            		    <button class="menu" @click="logout">Déconnexion</button>
            		  </div>
            		</div>
          		</div>
		  	</div>
		  <router-view/>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import SideBar from './components/SideBar.vue';
  import LoginView from './views/LoginView.vue';
  
  export default {
	name: 'App',
	components: {
	  SideBar,
	  LoginView
	},
	data() {
    return {
      showDropdown: false
    };
  },
	computed: {
	  ...mapGetters('auth', ['isAuthenticated']),
	},
	methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    goToProfile() {
      this.$router.push({ name: 'ProfilAgent', params: { id_agent: this.$store.state.auth.agentID } });
      this.showDropdown = false;
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.showDropdown = false;
    }
  },
	created() {
	  // Initialise l'authentification à la création de l'application
	  this.$store.dispatch('auth/initializeAuthentication');
	}
  }
  </script>
 
 <style lang="scss">
  .login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90vh;
  }
  
  :root {
	--primary: #9281FF;
	--primary-alt: #f24707;
	--grey: #64748b;
	--dark: #ffffff;
	--dark-alt: #d7cee6;
	--light: #e0e0e0;
	--sidebar-width: 300px;
  }
  
  * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
  }
  
  body {
	background: var(--light);
  }
  
  button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
  }
  
  .home {
	display: flex;
  }

.menu {
	color: grey;
	font-size: medium;
}

.cont {
  flex: 1; /* Prend l'espace restant */
	margin-left: 3%;
	margin-right: 3%;
  }
  
  .container {
	background-color: #f8f9fa;
	padding: 20px;
	margin-bottom: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .containertitre {
	margin-top: 15px;
	max-width: 100%;
  }
  
  .titre-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
  }
  
  h1.titre {
	color: gray;
	font-size: larger;
	margin-right: auto;
  }
  
  p {
	color: gray;
  }
  
  .material-icons {
	font-size: 24px;
	color: gray;
  }

  .dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  padding: 10px;
}

.dropdown-menu button {
  padding: 10px;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
}

.dropdown-menu button:hover {
  background-color: #f1f1f1;
}
  </style>