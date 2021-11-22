import React, {useState} from 'react'
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {LockOutlined} from "@mui/icons-material";
import useStyles from './styles'
import Input from "./Input";

const Auth = () => {
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)


    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const switchMode = () => {
        setIsSignUp((prevState => !prevState))
        handleShowPassword(false)
    }

    return(
        <Container component={"main"} maxWidth={"xs"}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant={"h5"}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={()=> handleSubmit()}>
                    <Grid container spacing={2}>
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
                    <Grid container justify={"flex-end"}>
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