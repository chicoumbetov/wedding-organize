import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontWeight: 600,
        color: 'rgba(0,183,255, 1)',
        // color: '002147'
    },
    image: {
        marginLeft: '15px',
        borderRadius: '50%'
    },
}));