import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import authHeader from "../../../services/auth-header";
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 320,
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

export default function UserCreateForm() {
    const classes = useStyles();

    const [user, setUser] = React.useState(emptyUser());
    const [loggedUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    const [createdUserId, setCreatedUserId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [submitError, setSubmitError] = React.useState(null);

    function emptyUser() {
        return {
            first_name: "",
            last_name: "",
            password: "",
            passwordConfirmation: "",
            email: "",
            type: "",
        }
    }
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(event) {
        if (user.password === user.passwordConfirmation && !loading) {
            const axiosInstance = axios.create({
                xsrfCookieName: 'csrftoken',
                xsrfHeaderName: "X-CSRFTOKEN",
                withCredentials: true,
            })
            event.preventDefault();
            const url = '/api/users/create';
            setLoading(true)
            axiosInstance.post(url, user, {
                headers: authHeader()
            })
                .then(res => {
                    setCreatedUserId(res.data.id);
                })
                .catch(err => {
                    setSubmitError(err)
                })
                .finally(() => {
                    setLoading(false)
                    resetForm();
                });
        }
    }

    function resetForm() {
        setUser(emptyUser());

        setTimeout(() => {
            setSubmitError(null);
            setCreatedUserId(null);
        }, 15000);

    }

    function SubmitAlert() {
        if (submitError) {
            return <Alert severity="error">
                <AlertTitle>Błąd</AlertTitle>
            Podczas tworzenia konta użytkownika wystąpił błąd
            </Alert>
        } else if (createdUserId) {
            return <Alert severity="success">
                <AlertTitle>Sukces</AlertTitle>
            Konto uzytkownika zostało utworzone. ID to <b>{createdUserId}</b>
            </Alert>
        }

        return null;
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                title="Konto użytkownika"
                subheader="Stwórz konto użytkownika podając jego dane."
            />
            <SubmitAlert></SubmitAlert>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className={classes.inputContainer}>
                        <TextField className={classes.textField}
                            placeholder='Imię'
                            id='firstName'
                            name="first_name"
                            value={user.first_name}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className={classes.inputContainer}>
                        <TextField className={classes.textField}
                            placeholder='Nazwisko'
                            id='lastName'
                            name="last_name"
                            value={user.last_name}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className={classes.inputContainer}>
                        <TextField className={classes.textField}
                            placeholder='Hasło'
                            id='password'
                            name="password"
                            value={user.password}
                            type="password"
                            onChange={handleChange}
                            required />
                    </div>
                    <div className={classes.inputContainer}>
                        <TextField className={classes.textField}
                            error={user.password !== user.passwordConfirmation || null}
                            helperText={user.password !== user.passwordConfirmation ? 'Hasła się nie zgadzają' : ''}
                            placeholder='Potwierdzenie hasła'
                            id='passwordConfirmation'
                            name="passwordConfirmation"
                            value={user.passwordConfirmation}
                            type="password"
                            onChange={handleChange}
                            required />
                    </div>
                    <div className={classes.inputContainer}>
                        <TextField className={classes.textField}
                            placeholder='Email'
                            id='email'
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className={classes.inputContainer}>
                        <FormControl required className={classes.textField}>
                            <InputLabel id="userTypeLabel">Typ użytkownika</InputLabel>
                            <Select
                                labelId="userTypeLabel"
                                id="userTypeSelect"
                                name="type"
                                value={user.type}
                                onChange={handleChange}
                            >
                                <MenuItem value={"STUDENT"}>Student</MenuItem>
                                <MenuItem value={"PARENT"}>Rodzic</MenuItem>
                                <MenuItem value={"TEACHER"}>Nauczyciel</MenuItem>
                                {loggedUser?.user?.type === 'ADMINISTRATOR' ? <MenuItem value={"ADMINISTRATOR"}>Administrator</MenuItem> : null}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.inputContainer}>
                        <Button
                            variant="contained"
                            type="submit"
                            label="Stwórz konto"
                            className="button-submit"
                            primary={true}>
                            {loading ? <CircularProgress /> : "Stwórz konto"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
