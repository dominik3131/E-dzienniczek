import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const ShowSingleMessage = ({match}) => {
    const classes = useStyles();
    const message = useSelector(state => {
     return (match.path === "/users/messages/received/:id" ?
      state.ReceivedMessages.messages.find(message => message.id === parseInt(match.params.id)) :
      state.SentMessages.messages.find(message => message.id === parseInt(match.params.id))
      )
    });
    return ( 
    <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h5" gutterBottom><strong>{message.title}</strong></Typography>
            </Grid>
            <Grid item container direction="row" alignItems="center" spacing={2}>
              <Grid item>
                <Avatar>W</Avatar>
              </Grid>
              <Grid item direction="row">
                <Typography variant="h6">Od: {message.sender.first_name} {message.sender.last_name}</Typography>
                <Typography variant="caption">{`<${message.sender.email}>`}</Typography>
              </Grid>
            </Grid>
            <Grid item>
                <Typography>{message.content}</Typography>
            </Grid>
          </Grid>
        </Paper>
    </div>
    );
}
 
export default ShowSingleMessage;