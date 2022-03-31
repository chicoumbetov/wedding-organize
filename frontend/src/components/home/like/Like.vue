<template src="./Like.html"></template>

<script>


export default {
    name: "Like",

    data() {
        return {
          user_like: [],
          user_id_connected: ''
        }
    },
  props: ['like'],
    methods: {
      elem_array: function () {
        this.$props.like.forEach((value) => {
          this.user_like.push({user_id: value.UserId})
        });
      },
    },

    created() {
    },
    mounted() {
      this.user_id_connected = JSON.parse(localStorage.getItem('user'))
      this.elem_array()
    },
}
</script>
<style scoped src="./Like.css"></style>
