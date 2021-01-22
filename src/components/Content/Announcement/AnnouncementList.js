import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../../helpers/api/AnnouncementApi';
import Announcement from './Announcement';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 320,
        maxWidth: 820,
        padding: 10,
    },
}));

export default function AnnouncementList(props) {

    const classes = useStyles();
    // TODO initial state as []
    const [announcements, setAnnouncements] = React.useState([
        {
            "id": 15,
            "user": {
                "id": 8,
                "email": "admin1@test.com",
                "first_name": "Klaudia4",
                "last_name": "Rak",
                "type": "ADMINISTRATOR"
            },
            "title": "announcement 7",
            "content": "announcement content 7",
            "date": "2021-01-15T19:53:05.828187Z",
            "attachment": "http://localhost:8000/media/test.txt"
        },
        {
            "id": 14,
            "user": {
                "id": 8,
                "email": "admin1@test.com",
                "first_name": "Klaudia4",
                "last_name": "Rak",
                "type": "ADMINISTRATOR"
            },
            "title": "announcement 7",
            "content": "announcement content 7",
            "date": "2020-12-20T11:19:50.820760Z",
            "attachment": "http://localhost:8000/media/1_btz24bC.png"
        },
        {
            "id": 13,
            "user": {
                "id": 8,
                "email": "admin1@test.com",
                "first_name": "Klaudia4",
                "last_name": "Rak",
                "type": "ADMINISTRATOR"
            },
            "title": "announcement 7",
            "content": "announcement content 7",
            "date": "2020-12-20T11:19:39.752678Z",
            "attachment": "http://localhost:8000/media/test.pdf"
        }
    ]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        // TODO fetching announcements when component activates
        // using api/announcements if props.onlyLatest is false
        // using api/announcements/latest otherwise
        setLoading(false);
    }, []);


    function Announcements() {
        return announcements.map(announcement => {
            return <Grid item xs={12} key={announcement.id}>
                <Announcement announcement={announcement} key={announcement.id}></Announcement>
            </Grid>
        })
    }

    function AnnouncementsGrid() {
        if (loading) {
            return <CircularProgress />

        } else {
            return <Grid container spacing={3}>
                <Announcements></Announcements>
            </Grid>
        }
    }

    return (
        <div className={classes.root}>
            <AnnouncementsGrid></AnnouncementsGrid>
        </div>
    );
}