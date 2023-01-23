import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DOMEN_SERVER, DOMEN_SITE} from '../../config/const';
import Form from 'react-bootstrap/Form';
import {Button, Card} from "react-bootstrap";
import {Routes, Route, useParams, useNavigate} from 'react-router-dom';
import style from "../Adsview/ad/ad.module.css";
import Accordion from "react-bootstrap/Accordion";
function UserInformationForm() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const params = useParams();
    let userId=params.id;
   const navigate = useNavigate();
   const goToDialog=event=>{
       event.persist()
       axios.post(DOMEN_SERVER + "/dialog",{user2_id:userId}).then(res => {
           console.log(res.data)
           if (res.data) {
               if (res.data) {
                   navigate('/dialog/'+res.data.id)
               }
               else alert("There are no Info")
           } else {
               alert("There are no Info")
           }
       }).catch(() => {
           alert("An error occurred on the server")
       })

   }
    const [userInfo, setUserInfo] = useState(() => {
        return {
            name: "",
            surname: "",
            birthdate: "",
            gender: "",
            discord: "",
            email: "",
            steam: "",
            vk: ""

        }
    })
    const [user, setUser]=useState(()=>
    {
        return{
            username:'',
            userId:'',
        }
    })
    const [effect, setEffect] = useState(true);

    useEffect(() => {
        if( effect){
            setEffect(false)
            axios.get(DOMEN_SERVER + "/userInformation/"+userId).then(res => {
                if (res.data) {
                    if (res.data) {
                        setUserInfo({
                            name: res.data.userInfo.name,
                            surname: res.data.userInfo.surname,
                            birthdate: res.data.userInfo.birthdate,
                            gender: res.data.userInfo.gender,
                            discord: res.data.userInfo.discord,
                            email: res.data.userInfo.email,
                            steam: res.data.userInfo.steam,
                            vk: res.data.userInfo.vk,

                        });

                        setUser({username: res.data.username,
                        userId: res.data.userId})
                    }
                    else alert("There are no Info")
                } else {
                    alert("There are no Info")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
        }
    });

    return (
    <div className={style.MainPost}>
        <Card className="text-center">
            <Card.Header onClick={goToDialog}>{user.username}</Card.Header>
            <Card.Body>
                <Card.Title>{userInfo.name} {userInfo.surname}</Card.Title>
                <Card.Text>
                    {userInfo.birthdate}
                    {userInfo.gender}
                </Card.Text>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Body>
                            <div style={{display: userInfo.steam==null? 'none':'inline-block'}}>Стим: {userInfo.steam}</div><div/>
                            <div style={{display: userInfo.discord==null? 'none':'inline-block'}}>Дискорд: {userInfo.discord}</div><div/>
                            <div style={{display: userInfo.vk==null? 'none':'inline-block'}}>Вк {userInfo.vk}</div><div/>
                            <div style={{display: userInfo.email==null? 'none':'inline-block'}}>Email {userInfo.email}</div><div/>
                        </Accordion.Body>
                        <Accordion.Header>Show more</Accordion.Header>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    </div>
    );
}
export default UserInformationForm;