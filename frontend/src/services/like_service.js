import axios from 'axios'


export  default class  likeService{

    get_like(id_comment) {
        return axios.get('http://'+'127.0.0.1:1100'+'/api/'+`${id_comment}`+'/like')
    }

/*    post_like(id){
        return axios.post('http://'+'127.0.0.1:1100'+'/api/posts/', {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        })
    }

    delete_like(){
        return axios.delete('http://'+'127.0.0.1:1100'+'/api/posts/', {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        })
    }*/
}
