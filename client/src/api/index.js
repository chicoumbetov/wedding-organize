import axios from 'axios'

const url = "http://localhost:5001";
// const url = "https://wedding-react-js.herokuapp.com";

const API = axios.create({ baseURL: url })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`);
export const fetchPostsBySearchAxios = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const createPost = (newPost) => API.post("posts", newPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, updatedPostData) => API.patch(`/posts/${id}`, updatedPostData)
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const deletePost = (id) => API.delete(`posts/${id}`)

export const signIn = (formData) => API.post("/auth/signin", formData)
export const signUp = (formData) => API.post("/auth/signup", formData)

export const getUsers = () => API.get("users");
export const getOneUser = (id) => API.get(`/users/${id}`);
