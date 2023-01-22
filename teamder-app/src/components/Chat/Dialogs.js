import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DOMEN_SERVER, DOMEN_SITE} from '../../config/const';
import {Button} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DialogTile from "./dialogTile/dialogTile";

export default function Dialogs() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const [dialogs, setDialogs]=useState([]);
    const [isEffect, setEffect]=useState(true);
    useEffect(() => {
        if(dialogs.length<1 && isEffect){
            setEffect(false);
            axios.get(DOMEN_SERVER + "/dialog").then(res => {
                if (res.data) {
                    if (res.data) {
                        setDialogs([...res.data]);
                    }
                    else alert("There are no Dialogs")
                } else {
                    alert("There are no Dialogs")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
        }});


    let posts=dialogs.map(el=><div><DialogTile post={el}/></div>)

    return (
        <div>
            <div>
                {posts}
            </div>
        </div>
    )
}