<template src="./Articles.html"></template>

<script>

import postsService from "@/services/posts_service";
import Commentaires from "@/components/home/commentaires/Commentaires";
import Like from "@/components/home/like/Like";
export default {
    name: "Articles",
    components : {
      Commentaires,
      Like
    },
    data() {
        return {
          articles: []
        }
    },
    methods: {
      get_all_articles: function () {
        const _postsService = new postsService()

        _postsService.get_all().then(
            (res) => {
             this.articles.push(res.data)
            }
        )
      },
      commentaires_open: function (event){
        console.log(event)
      }

    },

    created() {
    },
    mounted() {

      this.get_all_articles()
    },
}
</script>
<style scoped src="./Articles.css"></style>
