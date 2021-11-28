import React, {useState} from 'react'
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import Icon from './icon'

import {LockOutlined} from "@mui/icons-material";
import useStyles from './styles'
import Input from "./Input";
import GoogleLogin from "react-google-login";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const dispatch = useDispatch()
    const history = useNavigate()

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)


    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const switchMode = () => {
        setIsSignUp((prevState => !prevState))
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        console.log("Google res:", res)
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: 'AUTH', data: { result, token } })

            history('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log("Google Sign In was UNsuccessful. Try Again Later", error)
    }

    return(
        <Container component={"main"} maxWidth={"xs"}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant={"h5"}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={()=> handleSubmit()}>
                    <Grid container spacing={2} style={{ marginBottom: '20px'}}>
                        {
                            isSignUp && (
                                <>
                                    <Input name={'firstName'} label={"First name"} handleChange={()=> handleChange()} autoFocus half />
                                    <Input name={'lastName'} label={"Last name"} handleChange={()=> handleChange()} half />
                                </>
                            )
                        }
                        <Input name={'email'} label={"Email address"} handleChange={()=> handleChange()} type={'email'} />
                        <Input name={'password'} label={'Password'} handleChange={() => handleSubmit()} type={showPassword ? "text" : "password"} handleShowPassword={() => handleShowPassword()} />
                        { isSignUp && <Input name={"confirmPassword"} label={"Repeat password"} handleChange={() => handleChange()} type={"password"}/>}
                    </Grid>
                    <Button type={"submit"} fullWidth variant={"contained"} color={"primary"} className={classes.submit}>
                        {isSignUp ? "Sign Up" : 'Sign In'}
                    </Button>
                    <GoogleLogin className={classes.submit}
                        clientId={"562298759719-juo6de1ndirsn3drogleevk3jqruuo4n.apps.googleusercontent.com"}
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color={'primary'}
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant={"contained"}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />

                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Button onClick={() => switchMode()}>{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth