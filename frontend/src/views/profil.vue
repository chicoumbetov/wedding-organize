<template>
  <div>
    <h1>Mon profil</h1>

    <form class="login container" @submit.prevent="update">
      <div class="center box-login">
        <img :src="form.avatar" alt="">
        <br>
        <input disabled required v-model="form.email" type="email"  style="width:80%; font-size:20px; margin-bottom:30px;">
        <br>
        <input disabled required v-model="form.username" type="text" style="width:80%; font-size:20px; margin-bottom:80px;">
        <br>
        <textarea required v-model="form.bio" style="width:80%; font-size:20px; margin-bottom:80px;"></textarea>
        <button type="submit" class="btn btn-dark">Mettre à jour</button>
      </div>
    </form>
    <button v-on:click="delete_profil" type="submit" class="btn btn-dark">Supprimer mon compte</button>
  </div>
</template>

<script>

import userService from "@/services/user_service";

export default {
name: "profil",
  data() {
    return {
      form: {
        username: "",
        email: "",
        bio: "",
        avatar: ""
      },
      id_user : ""
    }
  },
  methods: {
  get_profil: function() {
    const _userService = new userService()
    _userService.get_user(this.id_user).then(
        (res) => {
          console.log(res.data.avatar)
          this.form.username = res.data.username
          this.form.email = res.data.email
          this.form.bio = res.data.bio
          this.form.avatar = res.data.avatar
        }
    )
  },
  update: function() {
    const _userService = new userService()
    _userService.put_user(this.id_user,this.form.bio).then(
        (res) => {
          console.log(res)
        }
    )
  },
  delete_profil: function() {
    const _userService = new userService()

    _userService.delete_user(this.id_user).then(
        (res) => {
          if(res.status == 200){
            this.$router.replace('/login')
          }
        }
    )
  }

  },

  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.id_user = user.userId
  this.get_profil()

  }
}
</script>

<style scoped>

</style>
