import axios from 'axios'


export  default class  commentService{

    post_comment(id_user, id_post, comment) {
        return axios.post('http://'+'127.0.0.1:1100'+'/api/'+`${id_post}`+'/comments', {
            content: comment,
            PostId: id_post,
            userId: id_user,

        })
    }

    delete_comment(id_user, isAdmin) {
        console.log(localStorage.getItem('token'))
        return axios.delete('http://'+'127.0.0.1:1100'+'/api/comments/comment/'+`${id_user}`, {
                isAdmin: isAdmin
        })
    }
}
