import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Moment from 'moment';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 300,
        maxWidth: 800,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Announcement(props) {
    Moment.locale('pl');

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    function AnnouncementHeader() {
        const announcementDate = Moment(props.announcement.date).format('YYYY-MM-DD HH:MM');
        return <CardHeader
            avatar={
                <Avatar className={classes.avatar}>
                    {props.announcement.user.first_name.charAt(0)}{props.announcement.user.last_name.charAt(0)}
                </Avatar>
            }
            title={props.announcement.title}
            subheader={announcementDate}
        />
    }

    function AnnouncementInfo() {
        return <CardContent>
            <Typography variant="body2" color="textSecondary" component="div">
                <div>Utworzone przez:</div>
                <div>{props.announcement.user.first_name} {props.announcement.user.last_name}</div>
                <div>{props.announcement.user.email}</div>
            </Typography>
        </CardContent>
    }

    function AnnouncementActions() {
        return <CardActions disableSpacing>
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>
    }

    function AnnouncementContent() {
        return <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>
                    {props.announcement.content}
                </Typography>
                <AttachmentButton></AttachmentButton>
            </CardContent>
        </Collapse>
    }

    function AttachmentButton() {
        if (props.announcement.attachment) {
            const buttonName = props.announcement.attachment.substring(props.announcement.attachment.lastIndexOf('/') + 1)
            return <Button
                variant="contained"
                color="primary"
                className={classes.button}
                href={props.announcement.attachment}
                startIcon={<GetAppIcon />}>
                {buttonName}
            </Button>

        } else {
            return null;
        }
    }

    function AnnouncementCard() {
        if (props.announcement) {
            return <Card className={classes.root}>
                <AnnouncementHeader></AnnouncementHeader>
                <AnnouncementInfo></AnnouncementInfo>
                <AnnouncementActions></AnnouncementActions>
                <AnnouncementContent ></AnnouncementContent>
            </Card>
        } else {
            return null;
        }
    }

    return (<AnnouncementCard></AnnouncementCard>);
}