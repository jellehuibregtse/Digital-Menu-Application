import React, {useEffect, useState} from 'react';
import {
    TextField, FormControlLabel, Switch,
    Button, Grid, Avatar, Typography, makeStyles, Link, IconButton, Box
} from "@material-ui/core";
import {Close, LockOutlined} from "@material-ui/icons";
import Validate from "./Validate";
import Auth from "./Auth";
import Popup from "reactjs-popup";
import {grey, red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        height: '90%'
    },
    paper: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '600px',
        bottom: '80px',
        height: '420px'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    avatar: {
        color: theme.palette.secondary.contrastText,
        background: theme.palette.secondary.main
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    popupAnchor: {
        marginTop: theme.spacing(12),
        position: 'absolute',
        top: 0
    },
    popup: {
        borderRadius: '5px',
        border: '1px solid ' + grey['400'],
        padding: theme.spacing(1, 1, 1, 2),
        width: 'Calc(600px - ' + theme.spacing(3) + 'px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

export default (props) => {
    const classes = useStyles();

    const {form} = props;

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);

    const [emailAvailable, setEmailAvailable] = useState(null);

    const [signError, setSignError] = useState('');

    const [open, setOpen] = useState(props.location !== null && new URLSearchParams(props.location.search).get('c') === "true");

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false)
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (form === 'sign-up') {
            if (Validate.isValidEmail(email) === true && emailAvailable === true && Validate.isValidPassword(password) === true && (password2 === '' || password2 === password)) {
                await Auth.handleSignUp(email, password).then(r => {
                    if (r === true) {
                        document.location.href = '/sign-in?c=true';
                    } else
                        setSignError(r);
                }).catch(r => setSignError(r));
            } else {
                if (email === null)
                    setEmail('');
                if (password === null)
                    setPassword('');
                if (password2 === null)
                    setPassword2('');
            }
        } else {
            if (password !== null && password.length > 0) {
                await Auth.handleSignIn(email, password).then(r => {
                    if (r !== null) {
                        localStorage.setItem('token', r);
                        document.location.href = "/";
                    } else setSignError('Incorrect email or password!');
                }).catch(r => setSignError(r));
            } else {
                if (email === null)
                    setEmail('');
                if (password === null)
                    setPassword('');
            }
        }
    }

    return (
        <div className={classes.flex}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {form === 'sign-in' ? "Sign In" : "Sign Up"}
                </Typography>
                <Popup arrow={false}
                       trigger={<div className={classes.popupAnchor}/>}
                       closeOnDocumentClick={false}
                       open={signError.length > 0 || open}>
                    <Box className={classes.popup} style={{background: signError.length > 0 ? red['50'] : '#E8F0FE'}}>
                        {signError.length > 0 ? signError : 'Account was created! Sign in to continue.'}
                        <IconButton focusRipple={false} onClick={() => setOpen(false)}><Close/></IconButton>
                    </Box>
                </Popup>
                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete={form === 'sign-in' ? "email" : "off"}
                        autoFocus
                        onChange={async (e) => {
                            setEmail(e.target.value);
                            setEmailAvailable(null);
                            if(form === 'sign-up' && email !== null && Validate.isValidEmail(email) === true)
                                await Validate.emailAvailable(e.target.value).then(r => setEmailAvailable(r)).catch(() => {setEmailAvailable(true)});
                        }}
                        error={Validate.isValidEmail(email) !== true ? true : form === 'sign-up' && emailAvailable === false}
                        helperText={Validate.isValidEmail(email) !== true ? Validate.isValidEmail(email) : form === 'sign-up' && emailAvailable === false ? 'Email was already taken!' : ''}
                    />
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete={form === 'sign-in' ? "current-password" : "new-password"}
                        onChange={e => setPassword(e.target.value)}
                        error={form === 'sign-up' ? Validate.isValidPassword(password) !== true : password !== null && password.length === 0}
                        helperText={form === 'sign-up' ? Validate.isValidPassword(password) : password !== null && password.length === 0 ? 'Password is required!' : ''}
                    />
                    {form === 'sign-up' ?
                        <TextField
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="new-password"
                            label="Repeat Password"
                            type="password"
                            onChange={e => setPassword2(e.target.value)}
                            error={password2 === '' || password2 !== password}
                            helperText={password2 !== password ? 'Passwords don\'t match!' : password2 === '' ? 'Password is required!' : ''}
                        /> : null}
                    <FormControlLabel
                        control={<Switch value="remember" defaultChecked color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {form === "sign-in" ?
                            "Sign In" : "Sign Up"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/*{form === 'sign-in' ?*/}
                            {/*    <Link href="#" variant="body2" className={classes.link}>*/}
                            {/*        Forgot password?*/}
                            {/*    </Link> : null}*/}
                        </Grid>
                        <Grid item>
                            <Link href={form === "sign-in" ? "/sign-up" : "/sign-in"} variant="body2"
                                  className={classes.link}>
                                {form === "sign-in" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}