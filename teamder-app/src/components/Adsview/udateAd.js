import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DOMEN_SERVER, DOMEN_SITE} from '../../config/const';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import Ad from "./ad/ad";
import {Routes, Route, useParams, useNavigate} from 'react-router-dom';
export default function UpdateAd() {
    //elo, gender, high_age_lvl, is_active, low_age_lvl, tag, text, user_id, game_id, goal_id
    const navigate = useNavigate();
    const params = useParams();
    let adId=params.id;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const [ad, setAd] = useState(() => {
        return {
            id: "",
            elo: "",
            gender: "",
            high_age_lvl: "",
            low_age_lvl: "",
            tag: "",
            text: "",
            game_id: "",
            goal_id: "",

        }
    })
    const [games, setGames] = useState([]);
    const [goals, setGoals] = useState([]);
    useEffect(() => {
        if (games.length < 1)
            axios.get(DOMEN_SERVER + "/games").then(res => {
                if (res.data) {
                    if (res.data) {
                        setGames([...res.data]);
                    } else alert("There are no Games")
                } else {
                    alert("There are no Games")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
        if (goals.length < 1)
            axios.get(DOMEN_SERVER + "/goals").then(res => {
                if (res.data) {
                    if (res.data) {
                        setGoals([...res.data]);
                    } else alert("There are no Goals")
                } else {
                    alert("There are no Goals")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
        if(ad.game_id==""){
            console.log("adId")
            axios.get(DOMEN_SERVER + "/ad/"+adId).then(res => {
                console.log(res.data)
                if (res.data) {
                    if (res.data) {
                        setAd({
                            id: adId,
                            elo: res.data.elo,
                            gender: res.data.gender,
                            high_age_lvl: res.data.high_age_lvl,
                            low_age_lvl: res.data.low_age_lvl,
                            tag: res.data.tag,
                            text: res.data.text,
                            game_id: res.data.game_id,
                            goal_id: res.data.goal_id,

                        });
                    }
                    else alert("There are no Ads")
                } else {
                    alert("There are no Ads")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
        }
    });
    const changeInputAuth = event => {
        event.persist()
        setAd(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })

    }

    const getDataBack= event=>{
        let adId=localStorage.getItem('updatingAd')
        axios.get(DOMEN_SERVER + "/ad/"+adId).then(res => {
            console.log(res.data)
            if (res.data) {
                if (res.data) {
                    setAd({
                        id: adId,
                        elo: res.data.elo,
                        gender: res.data.gender,
                        high_age_lvl: res.data.high_age_lvl,
                        low_age_lvl: res.data.low_age_lvl,
                        tag: res.data.tag,
                        text: res.data.text,
                        game_id: res.data.game_id,
                        goal_id: res.data.goal_id,

                    });
                }
                else alert("There are no Ads")
            } else {
                alert("There are no Ads")
            }
        }).catch(() => {
            alert("An error occurred on the server")
        })
    }
    const submitChackin = event => {
        event.preventDefault();
        if (!ad.goal_id) {
            alert("You did not enter goal")
        } else if (!ad.game_id) {
            alert("You did not enter game")
        } else if (ad.high_age_lvl && ad.low_age_lvl && ad.high_age_lvl<ad.low_age_lvl) {
            alert("High level age less then low level age")
        } else{

            axios.put(DOMEN_SERVER + "/ad", {
                id:ad.id,
                elo: ad.elo,
                gender: ad.gender,
                high_age_lvl: ad.high_age_lvl,
                low_age_lvl: ad.low_age_lvl,
                tag: ad.tag,
                text: ad.text,
                game_id: ad.game_id,
                goal_id: ad.goal_id,
            }).then(res => {
                if (res.data) {
                    navigate("/myAds");
                } else {
                    alert("Something went wrong")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
        }
    }
    let gameOptions = games.map(el => <option value={el.id}>{el.game_name}</option>)
    let goalOptions = goals.map(el => <option value={el.id}>{el.goal_name}</option>)
    return (<div className="form">
        <h2>Измените свое объявление:</h2>
        <Button variant="success" onClick={getDataBack}>Get my data!</Button>
        <Form onSubmit={submitChackin}>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '60%'}}>
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" id="tag" name="tag" placeholder="Enter few words about human you looking for"
                              value={ad.tag} style={{margin: '5px', width: '100%'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <div/>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '30%', marginRight: '2px'}}>
                <Form.Label>Ваше эло</Form.Label>
                <Form.Control type="text" id="elo" name="elo" placeholder="Enter elo" value={ad.elo}
                              style={{margin: '5px'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '30%', marginLeft: '2px'}}>
                <Form.Label>Ваш гендер</Form.Label>
                <Form.Control type="text" id="gender" name="gender" placeholder="Enter your gender" value={ad.gender}
                              style={{margin: '5px'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <div/>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '30%', marginRight: '2px'}}>
                <Form.Label>Возраст от</Form.Label>
                <Form.Control type="number" id="low_age_lvl" name="low_age_lvl" value={ad.low_age_lvl}
                              style={{margin: '5px', width: '100%'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '30%', marginLeft: '2px'}}>
                <Form.Label>до</Form.Label>
                <Form.Control type="number" id="high_age_lvl" name="high_age_lvl" value={ad.high_age_lvl}
                              style={{margin: '5px', width: '100%'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '60%'}}>
                <Form.Select aria-label="Default select example" name="game_id" id="game_id" value={ad.game_id}
                             style={{margin: '5px'}}
                             onChange={changeInputAuth}>
                    <option>Select game</option>
                    {gameOptions}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '60%'}}>
                <Form.Select aria-label="Default select example" name="goal_id" id="goal_id" value={ad.goal_id}
                             style={{margin: '5px'}}
                             onChange={changeInputAuth}>
                    <option>Select goal</option>
                    {goalOptions}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '60%'}}>
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" name="text" id="text" rows={3} value={ad.text} style={{margin: '5px'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <div/>
            <Button type="submit">Обновить объявление</Button>
        </Form>
    </div>);
}