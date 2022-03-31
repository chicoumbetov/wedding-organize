import axios from 'axios'


export  default class  postsService{
    get_all(){
        return axios.get('http://'+'127.0.0.1:1100'+'/api/posts/')
    }

    get_id(){
        return axios.get('http://'+'127.0.0.1:1100'+'/api/posts/')
    }

    post(){

    }


    put(){
    }

    delete_id(){

    }
}
