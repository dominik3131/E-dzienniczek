import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import authHeader from "../../services/auth-header";
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 320,
        maxWidth: 820,
        padding: 10,
    },
    inputContainer: {
        padding: 10
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
        <div>
            <SubmitAlert></SubmitAlert>
            <form onSubmit={handleSubmit}>
                <div className={classes.inputContainer}>
                    <TextField placeholder='Tytuł' id='title' value={title} onChange={handleTitleChange} required />
                </div>
                <div className={classes.inputContainer}>
                    <TextField placeholder='Zawartość' id='content' value={content} onChange={handleContentChange} required />
                </div>
                <div className={classes.inputContainer}>
                    <InputBase type="file" id="file" onChange={handleAttachmentChange} />
                </div>
                <div className={classes.inputContainer}>
                    <Button variant="contained" type="submit" label="login" className="button-submit" primary={true}>
                        Dodaj ogłoszenie
                    </Button>
                </div>
            </form>
        </div>
    );
}
