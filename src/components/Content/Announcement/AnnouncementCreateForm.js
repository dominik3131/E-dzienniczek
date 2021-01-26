import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import authHeader from "../../../services/auth-header";
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 420,
        padding: 10,
        margin: 10
    },
    inputContainer: {
        padding: 10
    },
    textField: {
        width: "100%"
    }
}));

export default function AnnouncementCreateForm() {
    const classes = useStyles();

    const [announcement, setAnnouncement] = React.useState(emptyAnnouncement());
    const [loading, setLoading] = React.useState(false);
    const [submitError, setSubmitError] = React.useState(null);
    const [submitSuccessful, setSubmitSuccessful] = React.useState(false);

    function emptyAnnouncement() {
        return {
            title: "",
            content: "",
            attachment: null,
        }
    }
    function handleChange(e) {
        setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
    }


    function handleAttachmentChange(event) {
        setAnnouncement({ ...announcement, attachment: event.target.files[0] });
    }

    function handleSubmit(event) {
        if (!loading) {
            const axiosInstance = axios.create({
                xsrfCookieName: 'csrftoken',
                xsrfHeaderName: "X-CSRFTOKEN",
                withCredentials: true,
            })
            event.preventDefault();
            const formData = new FormData();
            formData.append('file', announcement.attachment);
            formData.append('title', announcement.title);
            formData.append('content', announcement.content);
            const url = '/api/announcements';
            setLoading(true);
            axiosInstance.post(url, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    ...authHeader()
                }
            })
                .then(() => {
                    setSubmitSuccessful(true);

                })
                .catch(err => {
                    setSubmitError(err)
                })
                .finally(() => {
                    setLoading(false);
                    resetForm();
                });
        }
    }

    function resetForm() {
        setAnnouncement(emptyAnnouncement);

        setTimeout(() => {
            setSubmitError(null);
            setSubmitSuccessful(false);
        }, 5000);

    }

    function SubmitAlert() {
        if (submitError) {
            return <Alert severity="error">
                <AlertTitle>Błąd</AlertTitle>
            Podczas tworzenia ogłoszenia wystąpił błąd
            </Alert>
        } else if (submitSuccessful) {
            return <Alert severity="success">
                <AlertTitle>Sukces</AlertTitle>
            Ogłoszenie zostało dodane
            </Alert>
        }

        return null;
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                title="Ogłoszenie"
                subheader="Stwórz ogłoszenie podając jego tytuł i zawartość. Opcjonalnie możesz dodać załącznik."
            />
            <SubmitAlert></SubmitAlert>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className={classes.inputContainer}>
                        <TextField className={classes.textField}
                            placeholder='Tytuł'
                            id='title'
                            name='title'
                            value={announcement.title}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className={classes.inputContainer}>
                        <TextField className={classes.textField}
                            placeholder='Zawartość'
                            id='content'
                            name='content'
                            value={announcement.content}
                            multiline
                            rows={10}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className={classes.inputContainer}>
                        <InputBase
                            type="file"
                            id="file"
                            onChange={handleAttachmentChange} />
                    </div>
                    <div className={classes.inputContainer}>
                        <Button
                            variant="contained"
                            type="submit"
                            label="Dodaj ogłoszenie"
                            className="button-submit"
                            primary={true}>
                            {loading ? <CircularProgress /> : "Dodaj ogłoszenie"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
