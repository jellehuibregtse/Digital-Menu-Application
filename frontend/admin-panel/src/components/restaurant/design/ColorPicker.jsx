import React, {useState} from "react";
import {ListItem, Button, makeStyles, InputLabel} from "@material-ui/core";
import {ChromePicker} from "react-color";
import Popup from "reactjs-popup";

const contrastColor = (hexColor) => {
    hexColor = hexColor.substring(1);
    let r = parseInt(hexColor.substr(0, 2), 16);
    let g = parseInt(hexColor.substr(2, 2), 16);
    let b = parseInt(hexColor.substr(4, 2), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

const useStyles = makeStyles(() => ({
    listItem: {
        position: 'static'
    },
    colorButton: {
        width: '80px',
        marginRight: '10px'
    }
}))

export default (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    return (
        <ListItem className={classes.listItem}>
            <Popup trigger={
                <Button className={classes.colorButton} size="small"
                        style={{background: props.color, color: contrastColor(props.color)}}
                        variant="outlined"
                        onClick={() => {
                            setOpen(!open)
                        }}>{props.color}
                </Button>}
                   position="right top"
                   arrow={false} offsetX={10}>
                <ChromePicker
                    disableAlpha
                    color={props.color}
                    onChange={color => props.setColor(color.hex)}/>
            </Popup>
            <InputLabel>{props.name}</InputLabel>
        </ListItem>
    )
}