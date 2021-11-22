import React from 'react'
import {Grid, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Input = ({ half, name, label, autoFocus, type, handleShowPassword, handleChange }) => {

    return(
        <Grid item xs={6} sm={half ? 6 : 12}>
            <TextField
                name={name} label={label}
                onChange={handleChange}
                autoFocus={autoFocus}
                variant={"outlined"}
                required
                fullWidth
                type={type}
                InputProps={name === 'password'
                    && { endAdornment: (
                    <InputAdornment position={"end"}>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                    )}
                }
            />
        </Grid>
    )
}

export default Input