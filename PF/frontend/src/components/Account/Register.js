import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from "react";
import { Navigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Register() {
    
    const [login, setLogin] = useState(false)

    const [isusernameError, setIsusernameError] = useState(false)
    const [usernameError, setUsernameError] = useState('')

    const [ispasswordError, setIspasswordError] = useState(false)
    const [passwordError, setPasswordError] = useState('')

    const [ispassword2Error, setIspassword2Error] = useState(false)
    const [password2Error, setPassword2Error] = useState('')

    const [isemailError, setIsemailError] = useState(false)
    const [emailError, setEmailError] = useState('')

    const [isphoneError, setIsphoneError] = useState(false)
    const [phoneError, setPhoneError] = useState('')

    const[isavatarError, setIsavatarError] = useState(false)
    const[avatarError, setAvatarError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetch('http://localhost:8000/accounts/register/', {
            method: 'POST', body: data
        })
        .then(response => {
            if (response.status !== 200) {
                return response.json()
            } else {
                setLogin(true)
            }
        })
        .then(json => {
            if (json.username) {
                setUsernameError(json.username)
                setIsusernameError(true)
            } else setIsusernameError(false)

            if (json.password) {
                setIspasswordError(true)
                setPasswordError(json.password)
            }   else setIspasswordError(false)
            
            if (json.password2 || json.passwords) {
                setIspassword2Error(true)
                if (json.password2) {
                    setPassword2Error(json.password2)
                } else if (json.passwords) {
                    setPassword2Error(json.passwords)
                }
            } else setIspassword2Error(false)

            if (json.email) {
                setIsemailError(true)
                setEmailError(json.email)
            } else setIsemailError(false)

            if (json.phone) {
                setIsphoneError(true)
                setPhoneError(json.phone)
            } else setIsphoneError(false)

            if (json.avatar) {
                setIsavatarError(true)
                setAvatarError(json.avatar)
            } else {
                setIsavatarError(false)
                setAvatarError('')
            }
        })
        .catch(() => {})
    };

    if (login) return <Navigate to='/login' />

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error = {isusernameError}
                            helperText = {usernameError}
                            size = 'small'
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                        />

                        <TextField
                            error = {ispasswordError}
                            helperText = {passwordError}
                            size = 'small'
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="password"
                            type="password"
                            id="password"
                        />

                        <TextField
                            error = {ispassword2Error}
                            helperText = {password2Error}
                            size = 'small'
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="repeat password"
                            type="password"
                            id="password2"
                        />

                        <TextField
                            error = {isemailError}
                            helperText = {emailError}
                            size = 'small'
                            margin="normal"
                            fullWidth
                            name="email"
                            label="email"
                            type="email"
                            id="email"
                        />

                        <TextField
                            size = 'small'
                            margin="normal"
                            fullWidth
                            id="first_name"
                            label="first name"
                            name="first_name"
                        />

                        <TextField
                            size = 'small'
                            margin="normal"
                            fullWidth
                            id="last_name"
                            label="last name"
                            name="last_name"
                        />
                        
                        <TextField
                            error = {isphoneError}
                            helperText = {phoneError}
                            size = 'small'
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="phone number - exactly 10 integers"
                            name="phone"
                        />
                    
                        <div style={{ color: 'red', margin: 10}}> {avatarError} </div>

                        <label>Avatar</label>
                        <input required accept="image/*" type="file" name='avatar' id='avatar'/>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Already have account? Login here"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}