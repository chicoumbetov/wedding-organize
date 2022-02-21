import React, {useEffect, useState} from "react"
import {Button, TextField} from "@material-ui/core";
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
// import {getOneUser} from "../../actions/user";
import useStyles from "../Form/styles";
import {getOneUser as getOneUserAction} from "../../redux/usersSlice";

const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ user ] = useState(JSON.parse(localStorage.getItem('profile')))
    if(user && user.result) {
        console.log("user", user.result._id)
        // console.log("user", user.result.isAdmin)
        console.log("user", user.result.googleId)
    }
    const { user: useR } = useSelector((state) => state?.usersSlice)
    // console.log("useR:", useR)

    useEffect(() => {
        if(user && user.result) {
            dispatch(getOneUserAction(user.result._id || user.result.googleId));
        }
    }, [dispatch, user]);

    const [userData, setUserData] = useState({
        avatar: '', bio: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("handle submit:", event)
    }

    const clear = () => {
        setUserData({
            avatar: '', bio: ''
        })
    }

    return (
        <>

            <div className={'text-center'}>Profile page</div>
            <img
                className={'justify-content-center'}
                style={{ objectFit: 'cover', height: '100px', width: '100px', borderRadius: '50%'}}
                src={user && user.result && user.result.avatar
                ? user.result.avatar
                : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                }
                alt={"profile avatar"}
            />

            <div style={{ marginTop: '20px' }}>Name : {user && user.result.name}</div>
            <div>Email : {user && user.result.email}</div>
            <div>Bio : {user && user.result.bio}</div>
            <div>Droit admin : {user && user.result.isAdmin ? 'Oui' : 'Non'}</div>
            {useR
                && (
                    <form
                        autoComplete={"off"} noValidate
                        // className={`${classes.root} ${classes.form}`}
                        onSubmit={(data)=> handleSubmit(data)}
                    >
                        <TextField
                            name={"bio"}
                            variant={"outlined"}
                            label={"User bio"}
                            fullWidth
                            value={useR && useR.bio}
                            style={{ margin: "30px 0"}}
                            onChange={(event) => setUserData(
                                { ...userData }
                            )}
                        />
                        <FileBase64
                            type={"avatar"}
                            multiple={false}
                            onDone={
                                ({base64}) => setUserData(
                                    { ...userData, avatar: base64}
                                )
                            }
                        />
                        <div className={classes.buttonsForm}>
                            <Button className={`${classes.buttonSubmit} ${classes.button}`} variant={"contained"} color={"primary"} size={"large"} type={"submit"} fullWidth>Submit</Button>
                            <Button className={classes.button} onClick={() => clear()} variant={"contained"} color={"secondary"} size={"small"} type={"clear"} fullWidth>Clear</Button>
                        </div>
                    </form>
                )
            }
        </>
    )
}

export default Profile;
