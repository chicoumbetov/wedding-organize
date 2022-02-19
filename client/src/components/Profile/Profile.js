import React, {useEffect, useState} from "react"
import {TextField} from "@material-ui/core";
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import {getOneUser} from "../../actions/user";

const Profile = () => {
    const dispatch = useDispatch();
    const [ user ] = useState(JSON.parse(localStorage.getItem('profile')))
    if(user && user.result) {
        console.log("user", user.result._id)
        console.log("user", user.result.isAdmin)
        console.log("user", user.result.googleId)
    }
    const { user: useR } = useSelector((state) => state.users)
    console.log("useR:", useR)

    useEffect(() => {
        if(user && user.result) {
            dispatch(getOneUser(user.result._id || user.result.googleId));
        }
    }, [dispatch]);

    const [userData, setUserData] = useState({
        avatar: '', bio: ''
    })

    const handleSubmit = (data) => {
        console.log("handle submit:", data)
    }
    return (
        <>

            <div className={'text-center'}>Profile page</div>
            <img
                className={'justify-content-center'}
                style={{ objectFit: 'cover', height: '100px', width: '100px', borderRadius: '50%'}}
                src={user && user.result && user.result.avatar
                ? user.result.avatar
                : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            />

            <div style={{ marginTop: '20px' }}>Name : {user && user.result.name}</div>
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
                            onChange={(event) => event}
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
                    </form>
                )
            }
        </>
    )
}

export default Profile;
