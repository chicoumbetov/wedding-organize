import axios from 'axios'

// const API = axios.create({ baseURL: "http://localhost:5000" })
const API = axios.create({ baseURL: "https://wedding-react-js.herokuapp.com" })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

// const url = "http://localhost:5000/posts";
// const url = "https://wedding-react-js.herokuapp.com/posts";

export const fetchPosts = () => API.get("/posts")
export const createPost = (newPost) => API.post("posts", newPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, updatedPostData) => API.patch(`/posts/${id}`, updatedPostData)
export const deletePost = (id) => API.delete(`posts/${id}`)

export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post("/user/signup", formData)