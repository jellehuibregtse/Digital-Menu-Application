import React, {useState} from "react";
import {
    Drawer,
    InputLabel,
    Select,
    TextField,
    Tooltip,
    MenuItem,
    List,
    ListItem,
    makeStyles,
    Divider,
    ListSubheader,
} from "@material-ui/core";
import ColorPicker from "./ColorPicker";
import {Error} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    drawerPaper: {
        position: 'sticky',
        overflow: 'visible',
        alignItems: 'center',
        zIndex: 800
    },
    list: {
        overflow: 'auto',
        position: 'initial'
    },
    select: {
        width: '120px',
        marginRight: '10px',
        height: '30px',
        '& > div': {
            padding: '5px 20px',
            '&:focus': {
                background: 0
            }
        }
    },
    textField: {
        marginRight: '10px',
        width: '120px',
        '& > div': {
            height: '30px',
            '& > input': {
                padding: '5px 10px'
            }
        }
    },
    tooltipImg: {
        maxWidth: '100px',
        maxHeight: '75px'
    }
}))

const isValidImage = (url) => {

    let image = new Image();

    image.src = url;

    if (!image.complete) {
        return false;
    } else if (image.height === 0) {
        return false;
    }

    return true;
}

export default () => {
    const classes = useStyles();

    // palette
    const [color1, setColor1] = useState('#28C528');
    const [color2, setColor2] = useState('#1A7BAF');

    // media
    const [iconURL, setIconURL] = useState('');

    // layout
    const [edgeRad, setEdgeRad] = useState(1);

    return (
        <Drawer variant="permanent" classes={{paper: classes.drawerPaper}} color="primary">
            <List className={classes.list}>
                <ListSubheader>Palette</ListSubheader>
                <ColorPicker color={color1} setColor={setColor1} name="Primary"/>
                <ColorPicker color={color2} setColor={setColor2} name="Secondary"/>
                <Divider/>

                <ListSubheader>Media</ListSubheader>
                <ListItem>
                    <Tooltip
                        title={isValidImage(iconURL) ?
                            <img alt src={iconURL} className={classes.tooltipImg}/> :
                            <Error/>} arrow>
                        <TextField
                            size="small"
                            variant="outlined"
                            type="url"
                            className={classes.textField}
                            onChange={e => {
                                setIconURL(e.target.value)
                            }}
                        />
                    </Tooltip>
                    <InputLabel>Icon URL</InputLabel>
                </ListItem>
                <Divider/>

                <ListSubheader>Layout</ListSubheader>
                <ListItem>
                    <Select value={edgeRad}
                            onChange={e => setEdgeRad(e.target.value)}
                            variant="outlined"
                            className={classes.select}>
                        <MenuItem value={1}>Rounded</MenuItem>
                        <MenuItem value={2}>Sharp</MenuItem>
                    </Select>
                    <InputLabel>Edge radius</InputLabel>
                </ListItem>
            </List>
        </Drawer>
    )
}