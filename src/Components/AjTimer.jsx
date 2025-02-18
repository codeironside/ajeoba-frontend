import AjTypography from "./AjTypography";
import Box from "@mui/material/Box";
import * as moment from 'moment';
import React from "react";
import { useState, useEffect } from "react";

const AjTimer = (props) => {
    let [min, setMin] = useState(0);
    let [sec, setSec] = useState(0);
    useEffect(() => {
        if (props.timer < 1) {
            return;
        }
        const clear = {};
        const timerTime = moment().add(props.timer, 'minutes');
        clearInterval(clear[props.name]);
        clear[props.name] = setInterval(() => {
            setTimer(timerTime, clear[props.name]);
        }, 1000);

    }, [props.timer]);

    const setTimer = (timerTime, clear) => {
        const difference = moment.duration(timerTime.diff(moment()));
        const dMin = difference.minutes();
        const dSec = difference.seconds();
        setMin(String(dMin).padStart(2, '0'));
        setSec(String(dSec).padStart(2, '0'));
        if (dMin === 0 && dSec === 0) {
            props.onComplete(true);
            clearInterval(clear);
        }
    }

    return (
        <Box>
            <AjTypography styleData={props.styleData} displayText={`${min}:${sec}`}>
            </AjTypography>
        </Box>
    );
};

export default AjTimer;