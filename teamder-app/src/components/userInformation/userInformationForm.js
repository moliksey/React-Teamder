import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DOMEN_SERVER, DOMEN_SITE} from '../../config/const';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {Routes, Route, useParams, useNavigate} from 'react-router-dom';
 function UserInformationForm() {
     axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const navigate = useNavigate();
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
   const [effect, setEffect] = useState(true);

    useEffect(() => {
        if( effect){
            setEffect(false)
            axios.get(DOMEN_SERVER + "/MyUserInformation").then(res => {
                console.log(res.data)
                if (res.data) {
                    if (res.data) {
                        setUserInfo({
                            name: res.data.name,
                            surname: res.data.surname,
                            birthdate: res.data.birthdate,
                            gender: res.data.gender,
                            discord: res.data.discord,
                            email: res.data.email,
                            steam: res.data.steam,
                            vk: res.data.vk,

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
        setUserInfo(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })

    }

    const submitChackin = event => {
        event.preventDefault();


           axios.put(DOMEN_SERVER + "/userInformation", {
               name: userInfo.name,
               surname: userInfo.surname,
               birthdate: userInfo.birthdate,
               gender: userInfo.gender,
               discord: userInfo.discord,
               email: userInfo.email,
               steam: userInfo.steam,
               vk: userInfo.vk,
            }).then(res => {
                if (res.data) {
                    navigate("/me");
                    alert("Данные сохранены")
                } else {
                    alert("Something went wrong")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })

    }

   return (<div className="form">
        <h2>Расскажите о себе:</h2>

        <Form onSubmit={submitChackin}>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '30%', marginRight: '2px'}}>
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" id="name" name="name" placeholder="Enter name" value={userInfo.name}
                              style={{margin: '5px'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '30%', marginLeft: '2px'}}>
                <Form.Label>Фамилия</Form.Label>
                <Form.Control type="text" id="surname" name="surname" placeholder="Enter your surname" value={userInfo.surname}
                              style={{margin: '5px'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <div/>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '30%', marginLeft: '2px'}}>
                <Form.Label>Ваш гендер</Form.Label>
                <Form.Control type="text" id="gender" name="gender" placeholder="Enter your gender" value={userInfo.gender}
                              style={{margin: '5px'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '30%', marginLeft: '2px'}}>
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control type="date" id="birthdate" name="birthdate" placeholder="Enter your birthdate" value={userInfo.birthdate}
                              style={{margin: '5px'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <div/>

            <Form.Group className="mb-3" style={{display: 'inline-block', width: '60%'}}>
                <Form.Label>Discord</Form.Label>
                <Form.Control type="text" id="discord" name="discord" placeholder="Enter your discord"
                              value={userInfo.discord} style={{margin: '5px', width: '100%'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '60%'}}>
                <Form.Label>Steam</Form.Label>
                <Form.Control type="text" id="steam" name="steam" placeholder="Enter your steam"
                              value={userInfo.steam} style={{margin: '5px', width: '100%'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '60%'}}>
                <Form.Label>Vk</Form.Label>
                <Form.Control type="text" id="vk" name="vk" placeholder="Enter your vk"
                              value={userInfo.vk} style={{margin: '5px', width: '100%'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <Form.Group className="mb-3" style={{display: 'inline-block', width: '60%'}}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" id="email" name="email" placeholder="Enter your email"
                              value={userInfo.email} style={{margin: '5px', width: '100%'}}
                              onChange={changeInputAuth}/>
            </Form.Group>
            <div/>
            <Button type="submit">Обновить информацию о себе</Button>
        </Form>
    </div>);
}
export default UserInformationForm;