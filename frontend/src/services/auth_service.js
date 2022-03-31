import axios from 'axios'


export  default class  authService{
    login(login, password){
        return axios.post('http://'+'127.0.0.1:1100'+'/api/users/login', {
            email: login,
            password: password,
        })
    }

    register(username, email, password) {
        return axios.post('http://'+'127.0.0.1:1100'+'/api/users/register', {
            email: email,
            password: password,
            username: username

        })
    }
}
