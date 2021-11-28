import * as React from 'react'
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import memories from "../../assets/images/images.jpeg";
import useStyles from "./styles";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()

    console.log("user:", user)

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        history('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        // Check JSON Web Token
        if(token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])

    return(
        <AppBar className={classes.appBar} position={"static"} color={"inherit"}>
            <div className={classes.brandContainer}>
                <Typography component={Link} to={'/'} className={classes.heading} variant={"h2"} align={"center"}>
                    Wedding
                </Typography>
                <img className={classes.image} src={memories} alt={"memories"} height={"60"}/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user
                    ? (<div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant={'h6'}>
                            {user.result.name}
                        </Typography>
                        <Button variant={"contained"} onClick={logout} className={classes.logout} color={"secondary"}>
                            Sign Out
                        </Button>
                    </div>)
                    : (<Button component={Link} to={'/auth'}>
                        Sign In
                    </Button>)}
            </Toolbar>

        </AppBar>
    )
}

export default Navbar;