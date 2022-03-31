<template>
  <div class="container">
      <table class="striped">
        <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Administrateur</th>
          <th>Supprimer</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.username}}</td>
          <td>{{ item.email }}</td>
          <td>{{item.isAdmin}}</td>
          <td><i class="fas fa-trash-alt"></i></td>
        </tr>
        </tbody>
      </table>
  </div>
</template>

<script>

import user_service from "@/services/user_service";

export default {
  name: "admin",
  data() {
    return {
      list: []
    }
  },
  methods: {
    get_list_user: function () {
      const _userService = new user_service()
      _userService.get_all_user().then(
          (res) => {
            this.list = res.data
          }
      )

    }

  },
  created() {
  },
  mounted() {
    this.get_list_user()
  },
}
</script>

<style scoped>
.container{
  min-height: 627px;
}
th{
  text-align: center;
}
td{
  text-align: center;
}
</style>
