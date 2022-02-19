import * as React from "react";
import { Container } from '@material-ui/core'

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import PostDetails from "./components/PostDetails/PostDetails";
import Admin from "./components/Admin/Admin";

export default App;

function App() {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth={"xl"}>
                <Navbar/>
                <Routes>
                    <Route path={'/'} exact element={<Navigate to="/posts" />}/>
                    <Route path={'/posts'} exact element={<Home/>}/>
                    <Route path={'/posts/search'} exact element={<Home/>}/>
                    <Route path={'/posts/:id'} exact element={<PostDetails/>}/>
                    <Route path={'/users/:id'} exact element={<Profile/>}/>
                    <Route path={'/users'} exact element={<Admin/>}/>
                    <Route path={'/auth'}
                           element={
                               !user
                               ? <Auth/>
                               : <Navigate to={"/posts"}/>
                           }
                    />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}
