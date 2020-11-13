import React, {useState} from 'react';
import {
    TextField,
    FormControlLabel,
    Switch,
    Button,
    Grid,
    Avatar,
    Typography,
    makeStyles,
    Link, FormHelperText
} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import Validate from "./Validate";
import Auth from "./Auth";

const useStyles = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        height: '90%'
    },
    paper: {
        position: 'relative',
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

    const submitHandler = async (e) => {
        e.preventDefault();
        if (form === 'sign-in') {
            if (password !== null && password.length > 0) {
                await Auth.handleSignIn(email, password).then(r => {
                    if (r !== null) {
                        sessionStorage.setItem('bearer', r);
                        document.location.href = "/";
                    } else setSignError('No bearer available');
                }).catch(r => setSignError(r));
            } else {
                if (email === null)
                    setEmail('');
                if (password === null)
                    setPassword('');
            }
        } else {
            if (Validate.isValidEmail(email) === true && emailAvailable === true && Validate.isValidPassword(password) === true && (password2 === '' || password2 === password)) {
                let result = '';
                await Auth.handleSignUp(email, password).then(r => result = r);
                if (result === true) {
                    alert('account was created');
                    document.location.href = 'sign-in';
                } else
                    setSignError(result);
            } else {
                if (email === null)
                    setEmail('');
                if (password === null)
                    setPassword('');
                if (password2 === null)
                    setPassword2('');
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
                            await Validate.emailAvailable(e.target.value).then(r => setEmailAvailable(r));
                        }}
                        error={Validate.isValidEmail(email) !== true ? true : form === 'sign-up' ? emailAvailable === false : emailAvailable === true}
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
                    <FormHelperText error>{signError}</FormHelperText>
                    <Grid container>
                        <Grid item xs>
                            {form === 'sign-in' ?
                                <Link href="#" variant="body2" className={classes.link}>
                                    Forgot password?
                                </Link> : null}
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