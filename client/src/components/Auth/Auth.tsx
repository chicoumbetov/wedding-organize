import React, {useState} from 'react'
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import Icon from './icon'

import {LockOutlined} from "@mui/icons-material";
import useStyles from './styles'
import Input from "./Input";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

import {useAppDispatch} from "../../store/hooks";
import {signInThunk, signUpThunk} from "../../redux/thunk";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData ] = useState(initialState)

    const dispatch = useAppDispatch()
    const history = useNavigate()

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }


    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log("formState", formData)

        if(isSignUp) {
            dispatch(signUpThunk({formData: {email: formData.email, password: formData.password, username: formData.email}, history}))
        } else {
            dispatch(signInThunk({email: formData.email, password: formData.password, history}))
            // dispatch(signin(formData, history))
        }
    }

    const handleChange = (e: any) => {
        e.preventDefault()

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const switchMode = () => {
        setIsSignUp((prevState => !prevState))
        handleShowPassword()
    }

    const googleSuccess = async(res: any) => {
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

    const googleFailure = (error: any) => {
        console.log("Google Sign In was UNsuccessful. Try Again Later", error)
    }

    return(
        <Container component={"main"} maxWidth={"xs"}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant={"h5"}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={(event)=> handleSubmit(event)}>
                    <Grid container spacing={2} style={{ marginBottom: '20px'}}>
                        {
                            isSignUp && (
                                <>
                                    <Input name={'firstName'} label={"First name"} handleChange={handleChange} autoFocus half />
                                    <Input name={'lastName'} label={"Last name"} handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name={'email'} label={"Email address"} handleChange={handleChange} type={'email'} />
                        <Input name={'password'} label={'Password'} handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name={"confirmPassword"} label={"Repeat password"} handleChange={handleChange} type={"password"}/>}
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
