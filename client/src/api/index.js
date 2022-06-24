import axios from 'axios'

const url = "http://localhost:1100"; // sequelize DB
// const url = "http://localhost:5001"; // MongoDB
// const url = "https://wedding-react-js.herokuapp.com";

const API = axios.create({ baseURL: url })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

// mongo
// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`);
export const fetchPostsBySearchAxios = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

// export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPosts = () => API.get(`/api/posts`)
export const fetchOnePost = (id) => API.get(`/api/posts/${id}`);

export const createPost = (newPost) => API.post("posts", newPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, updatedPostData) => API.patch(`/posts/${id}`, updatedPostData)
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const deletePost = (id) => API.delete(`posts/${id}`)

// mongo db server
// export const signIn = (formData) => API.post("/auth/signin", {email: "admin@gmail.com", password: 'test'})// formData)
// export const signUp = (formData) => API.post("/auth/signup", formData)

// sequlize server-jp
export const signIn = (formData) => API.post("/api/users/login", formData)// {email: "admin@gmail.com", password: 'test'})
export const signUp = (formData) => API.post("/api/users/register", formData);// {email: "adminjp@gmail.com", password: 'test', username: 'newUserJP'})

export const likesList = () => API.get('/api/likes/2/listlike')
export const commentList = () => API.get('/api/comments/1/listComments')



export const getUsers = () => API.get("/api/users/list");
export const getOneUser = (id) => API.get(`/api/users/profile/${id}`);
// mongo db
// export const getOneUser = (id) => API.get(`/users/${id}`);
// export const getUsers = () => API.get("users");
