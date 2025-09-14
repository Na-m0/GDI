<template>
    <div class="form-container">
      <h1>LOGIN</h1>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <input 
            type="text"
            v-model="agentInfo.login_agent"
            placeholder="Nom d'utilisateur"
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <input 
            type="password"
            v-model="agentInfo.password_agent"
            placeholder="Mot de passe"
            autocomplete="current-password"
          />
        </div>
        <button type="submit">Connexion</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'Login',
    data() {
      return {
        agentInfo: {
          login_agent: '',
          password_agent: ''
        }
      };
    },
    methods: {
      ...mapActions('auth', {
        loginAction: 'loginAgent'
      }),
  
      async submitLogin() {
        try {
          const loginSuccess = await this.loginAction(this.agentInfo);
          if (loginSuccess) {
            this.$router.push('/');
            // window.location.reload();
          } else {
            alert("Échec de la connexion. Veuillez vérifier vos informations d'identification.");
          }
        } catch (error) {
          console.error(error);
          alert("Une erreur s'est produite lors de la tentative de connexion.");
        }
      }
    }
  }
  </script>

  
<style scoped>

h1{
    text-align: center;
}

form {
    display: inline-grid;
    justify-items: center;
    padding: 30px;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.form-container {
    background-color: #f8f9fa;
    padding: 100px;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

.form-group input {
    width: 100%;
    padding: 15px;
    border: 1px solid #ced4da;
    border-radius: 10px;
    outline: none;
}

button {
  font-size: 16px;
  padding: 1em 3.3em;
  cursor: pointer;
  transform: perspective(300px) rotateX(-1deg);
  color: #9281FF;
  font-weight: 900;
  border: none;
  border-radius: 5px;
  background: linear-gradient(
    0deg,
    #9281ff5e,
    #9281ff5e
  );
  box-shadow: rgba(212, 175, 175, 0.2) 0px 20px 19px 0px;
  will-change: transform;
  transition: all 0.3s;
  border-bottom: 2px solid rgb(151, 155, 151);
}

button:hover {
  transform: perspective(180px) rotateX(13deg) translateY(12px);
}

button:active {
  transform: perspective(170px) rotateX(36deg) translateY(5px);
}

</style>