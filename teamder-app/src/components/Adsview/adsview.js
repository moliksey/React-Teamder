import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DOMEN_SERVER} from '../../config/const';
import Ad from "./ad/ad";
import {Button} from "react-bootstrap";


export default function Adsview() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const [ads, setAds]=useState([]);
    const [count, setCount]=useState(3);
    const [dispSM, setdispSM]=useState(true);
    const [isEffect, setEffect]=useState(true);
    useEffect(() => {
        if(ads.length<1 && isEffect)
        {     setEffect(false)
    axios.get(DOMEN_SERVER + "/ad",{
        headers: {
            last_num: count
        }
    }).then(res => {
        if (res.data) {
            if (res.data) {
                setAds([...res.data.main]);
                setdispSM(!res.data.last_part);
            }
            else alert("There are no Ads")
        } else {
            alert("There are no Ads")
        }
    }).catch(() => {
        alert("An error occurred on the server")
    })
    }});
    const  showMore= () => {
        axios.get(DOMEN_SERVER + "/ad", {
            headers: {
                last_num: count+3
            }
        }).then(res => {
            if (res.data) {
                if (res.data) {
                    setAds([...ads,...res.data.main]);
                    setdispSM(!res.data.last_part);
                }
                else alert("There are no Ads")
            } else {
                alert("There are no Ads")
            }
        }).catch(() => {
            alert("An error occurred on the server")
        })
        setCount(perv=>{return perv+3})
    }

    let posts=ads.map(el=><Ad post={el}/>)
    return (
        <div>
        <div>
            {posts}
        </div>
            <Button variant="outline-primary" style={{display: dispSM ? 'inline-block':'none'}} onClick={showMore}>Show more</Button>
        </div>
    )
}