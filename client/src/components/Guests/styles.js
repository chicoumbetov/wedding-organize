import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '5px',
        height: '100%',
        position: 'relative',
    },
    title: {
        padding: '0 16px',
        width: '70px',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000'
    },
    message: {
        width: '80px',
        borderRight: '1px solid #000'
    }
}));