<template>
  <div>
  <h1>S'authentifier</h1>

  <form class="login container" @submit.prevent="connexion">
    <div class="center box-login">
      <input required v-model="login" type="email" placeholder="Email" style="width:80%; font-size:20px; margin-bottom:30px;">
      <br>
      <input required v-model="password" type="password" placeholder="Mot de passe" style="width:80%; font-size:20px; margin-bottom:80px;">
      <br>
      <button type="submit" class="btn btn-dark btn-connect">Me connecter</button>
    </div>
  </form>
  </div>
</template>

<script>
import authService from "@/services/auth_service";

export default {
name: "login",
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    connexion: function () {
      console.log("connexion")
      const _authService = new authService()
      _authService.login(this.login, this.password).then( (response) => {
        if(response.status == 200){
          localStorage.setItem('user',  JSON.stringify(response.data))
          localStorage.setItem('token',  response.data.token)

          this.$router.replace('/')
          location.reload()

        }
      }).catch(function (error) {
        console.log(error)
      });
    }
  },
}
</script>

<style scoped>
  .login{
    padding:30px;
    border: 1px solid #ccc;
    margin-bottom: 250px;
  }
  h1{
    color:#000000;
    margin-bottom: 50px;
  }
  input::placeholder{
    color:#f57d20;
    font-weight: bold;
  }
  .btn-connect{
    background-color: #f57d20;
    color:#ffffff;
    font-weight: bold;
  }
</style>
