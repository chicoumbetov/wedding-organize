<template src="./Commentaires.html"></template>

<script>



import commentService from "@/services/comment_service";

export default {
    name: "Commentaires",

    data() {
        return {
          commentaire: '',
          user: ''
        }
    },
  props: ['comments'],
    methods: {
      send_comment: function(event) {
        const user = JSON.parse(localStorage.getItem('user'))
        const id_post = event.path[5].id
        const _commentService = new commentService()

        _commentService.post_comment(user.userId, id_post, this.commentaire).then(
            (res) => {
              console.log(res)
            }
        )
      },

      admin_remove_comment: function () {
        const _commentService = new commentService()
        _commentService.delete_comment(this.user.userId, true).then(
            (res) => {
              if(res.status == 200) {
                location.reload()
              }
            }
        )
      }

    },

    created() {
    },
    mounted() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.user = user
    },
}
</script>
<style scoped src="./Commentaires.css"></style>
