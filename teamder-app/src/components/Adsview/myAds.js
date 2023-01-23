import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DOMEN_SERVER, DOMEN_SITE} from '../../config/const';
import Ad from "./ad/ad";
import {Button} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useNavigate} from "react-router-dom";

export default function MyAds() {
    const navigate = useNavigate();
    const nav = event => {
        event.persist()
        navigate("/addAd");
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const [ads, setAds]=useState([]);
    const [isEffect, setEffect]=useState(true);
    useEffect(() => {
        if(ads.length<1 && isEffect){
            setEffect(false);
            axios.get(DOMEN_SERVER + "/myAd").then(res => {
                if (res.data) {
                    if (res.data) {
                        setAds([...res.data]);
                    }
                    else alert("There are no Ads")
                } else {
                    alert("There are no Ads")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
    }});
    const updateAdvert= event => {

        navigate('/updateAd/'+event.target.value)

    }
    const deleteAd=event=>{
        axios.delete(DOMEN_SERVER + "/ad/"+event.target.value).then(res => {
            if (res.data) {
                if (res.data) {
                    navigate("/myAds");
                }
                else alert("There are no Ads")
            } else {
                alert("There are no Ads")
            }
        }).catch(() => {
            alert("An error occurred on the server")
        })
    }

    let posts=ads.map(el=><div><Ad post={el}/> <ButtonGroup aria-label="Basic example">
        <Button variant="info" value={el.id} onClick={updateAdvert}>Update</Button>
        <Button variant="danger" value={el.id} onClick={deleteAd}>Delete</Button>
    </ButtonGroup> </div>)

    return (
        <div>
            <div>
                {posts}
            </div>
            <h2>Больше объявлений нет</h2>
            <Button variant="primary" onClick={nav}>Добавить</Button>
        </div>
    )
}