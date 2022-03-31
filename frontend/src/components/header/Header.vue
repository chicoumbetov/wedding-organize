<template src="./Header.html"></template>

<script>

export default {
    name: "Header",
    comments: {

    },
    data() {
        return {
          is_connect: false,
          is_admin: false
        }
    },
    methods: {
      logout:function() {
        localStorage.clear()
        this.is_connect = false
        this.$router.replace('/login')
        location.reload()
      }
    },

    created() {
    },
    mounted() {

      const user = localStorage.getItem('user')
      const parse = JSON.parse(user);

      if(parse.isAdmin == true){
        this.is_admin = true
      }

      if(parse.token){
        this.is_connect = true
      }
    },
}
</script>
<style scoped src="./Header.css"></style>
