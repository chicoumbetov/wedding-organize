import * as React from "react";
import { Container } from '@material-ui/core'

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import PostDetails from "./components/PostDetails/PostDetails";
import Admin from "./components/Admin/Admin";

function App() {
    // let user
    if(localStorage) {
        // user = JSON.parse(localStorage.getItem('profile') || '{}');
    }

    return (
        <BrowserRouter>
            <Container maxWidth={"xl"}>
                <Navbar/>
                <Routes>
                    <Route path={'/'} element={<Navigate to="/posts" />}/>
                    <Route path={'/posts'} element={<Home/>}/>
                    <Route path={'/posts/search'} element={<Home/>}/>
                    <Route path={'/posts/:id'} element={<PostDetails/>}/>
                    <Route path={'/users/:id'} element={<Profile/>}/>
                    <Route path={'/users'} element={<Admin/>}/>

                    <Route path={'/auth'}
                           element={/*
                               !user || user === {}
                               ?*/ <Auth/>
                               /*:
                                   <Navigate to={"/posts"}/>*/
                           }
                    />

                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
