import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Announcement from './Announcement';
import { getLatestAnnouncements, getAllAnnouncements } from "../../../helpers/api/AnnouncementApi";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 420,
        padding: 10,
    },
}));

export default function AnnouncementList(props) {

    const classes = useStyles();
    const [announcements, setAnnouncements] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = props.onlyLatest 
        ? async () => {
          const response = await getLatestAnnouncements();
          setAnnouncements(response);
          setLoading(false)
        }
        :async () => {
            const response = await getAllAnnouncements();
            setAnnouncements(response);
            setLoading(false)
          }
        fetchData();
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