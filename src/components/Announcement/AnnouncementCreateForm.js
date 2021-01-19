import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import authHeader from "../../services/auth-header";
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 320,
        maxWidth: 820,
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

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [attachment, setAttachment] = React.useState(null);
    const [submitError, setSubmitError] = React.useState(null);
    const [submitSuccessful, setSubmitSuccessful] = React.useState(false);

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function handleAttachmentChange(event) {
        setAttachment(event.target.files[0]);
    }

    function handleSubmit(event) {
        const axiosInstance = axios.create({
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: "X-CSRFTOKEN",
            withCredentials: true,
        })
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', attachment);
        // form_data.append('file', attachment, this.state.image.name);
        formData.append('title', title);
        formData.append('content', content);
        const url = '/api/announcements';
        axiosInstance.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                ...authHeader()
            }
        })
            .then(res => {
                setSubmitSuccessful(true);

            })
            .catch(err => {
                setSubmitError(err)
            })
            .finally(() => {
                resetForm();
            });
    }

    function resetForm() {
        setTitle('');
        setContent('');
        setAttachment(null);

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
                            value={title}
                            onChange={handleTitleChange}
                            required />
                    </div>
                    <div className={classes.inputContainer}>
                        <TextField className={classes.textField}
                            placeholder='Zawartość'
                            id='content'
                            value={content}
                            multiline
                            rows={10}
                            onChange={handleContentChange}
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
                            Dodaj ogłoszenie
                    </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
