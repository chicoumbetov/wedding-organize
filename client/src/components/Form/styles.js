import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
        borderRadius: '10px'
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonsForm: {
      display: "flex",
        flex: 1,
      justifyContent: "space-around"
    },
    buttonSubmit: {
        // marginBottom: 10,
        backgroundColor:"#002147",
        color: "#FFF"
    },
    button: {
        display: "flex",
        width: '40%',
    }
}));
