<template>
  <div>
    <h1>S'inscrire</h1>

    <form class="register container" @submit.prevent="inscription">
      <div class="center box-register">
        <input required v-model="username" type="text" placeholder="Pseudo" style="width:80%; font-size:20px; margin-bottom:30px;">
        <br>
        <input required v-model="email" type="email" placeholder="E-mail" style="width:80%; font-size:20px; margin-bottom:30px;">
        <br>
        <input required v-model="password" type="password" placeholder="Mot de passe" style="width:80%; font-size:20px; margin-bottom:80px;">
        <br>
        <button type="submit" class="btn btn-dark btn-connect">Inscription</button>
      </div>
    </form>
  </div>
</template>

<script>

import authService from "@/services/auth_service";

export default {
  name: "register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    inscription: function () {
      const _authService = new authService()
      _authService.register(this.username, this.email, this.password).then(
          (response) => {
            console.log(response);
          }
      )
    }
  }
}
</script>

<style scoped>
  .register{
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
