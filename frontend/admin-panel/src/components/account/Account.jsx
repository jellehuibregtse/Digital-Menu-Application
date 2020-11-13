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

    const [validEmailResponse, setValidEmailResponse] = useState(true);
    const [validPasswordResponse, setValidPasswordResponse] = useState(true);
    const [signResponse, setSignResponse] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (form === 'sign-up') {
            await Validate.isValidEmail(email).then(r => setValidEmailResponse(r));
            setValidPasswordResponse(Validate.isValidPassword(password));
            if(validEmailResponse === true && validPasswordResponse === true && (password2 === '' || password2 === password)) {
                let result = '';
                await Auth.handleSignUp(email, password).then(r => result = r);
                if (result === true) {
                    alert('account was created');
                    document.location.href = 'sign-in';
                }
                else
                    setSignResponse(result);
            }
        } else
            await Auth.handleSignIn(email, password).then(r => {if(r !== null) {sessionStorage.setItem('bearer', r); document.location.href = "/"} else setSignResponse('Bad request')}).catch(r => setSignResponse(r));
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
                            if (form === 'sign-up') {
                                setValidEmailResponse(true);
                                await Validate.isValidEmail(e.target.value).then(r => setValidEmailResponse(r));
                            }
                        }}
                        error={form === 'sign-up' && validEmailResponse !== true}
                        helperText={form === 'sign-up' ? validEmailResponse : ''}
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
                        onChange={e => {
                            setPassword(e.target.value);
                            if (form === 'sign-up')
                                setValidPasswordResponse(Validate.isValidPassword(e.target.value));
                        }}
                        error={form === 'sign-up' && validPasswordResponse !== true}
                        helperText={form === 'sign-up' ? validPasswordResponse : ''}
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
                            onChange={e => {
                                setPassword2(e.target.value);
                            }}
                            error={!(password2 === '' || password2 === password)}
                            helperText={(password2 === '' || password2 === password) ? '' : 'Passwords don\'t match!'}
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
                    <FormHelperText error>{signResponse}</FormHelperText>
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