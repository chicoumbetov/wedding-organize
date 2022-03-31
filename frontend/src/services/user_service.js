import axios from 'axios'


export  default class  userService{

    get_all_user() {
        return axios.get('http://'+'127.0.0.1:1100'+'/api/users/list')
    }

    get_user(id) {
        return axios.get('http://'+'127.0.0.1:1100'+'/api/users/profile/'+`${id}`)
    }

    put_user(id_user, bio) {
        return axios.put('http://'+'127.0.0.1:1100'+'/api/users/profile/'+`${id_user}`, {
            bio: bio,

        })
    }

    delete_user(id) {
        return axios.delete('http://'+'127.0.0.1:1100'+'/api/users/'+`${id}`)
    }
}
