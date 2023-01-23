import React, {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {DropdownButton, Image} from "react-bootstrap";
import logoImg from "../../UI/images/logo.png";
import style from "./header,.module.css";
import axios from "axios";
import {DOMEN_SERVER} from "../../config/const";
import Dropdown from 'react-bootstrap/Dropdown';

const SimpleHeader = styled(AppBar)`
  background-color: darkmagenta;
`

const LogoImage = styled(Image)`
  width: 64px;
  height: 64px;
`;

const Teamder = styled(Typography)`
  font-family: "Permanent Marker";
  margin-left: 10px;
`

function Header() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const nav1 = event => {
        event.persist()
        navigate("/myAds");
    }
    const nav2 = event => {
        event.persist()
        navigate("/myDialogs")
    }
    const nav3 = event => {
        event.persist()
        navigate("/me")
    }
    const logOut = event => {
        event.persist()
        localStorage.removeItem('token');
        window.location='/mainPage'
    }
    useEffect(() => {
        if (user.length < 1) {
            axios.get(DOMEN_SERVER + "/me").then(res => {
                if (res.data) {
                    if (res.data) {
                        if (res.data.isLoggedIn) {
                            setIsLoggedIn(true);
                            setUser(res.data.username)
                        }

                    } else alert("There are no Ads")
                } else {
                    alert("There are no Ads")
                }
            }).catch(() => {
                alert("An error occurred on the server")
            })
        }
    });
    return (
        <SimpleHeader position="fixed">
            <Container>
                <Toolbar>
                    <LogoImage src={logoImg}></LogoImage>
                    <Teamder variant="h5">Teamder</Teamder>
                    <ul>
                        <li><NavLink to={"/mainPage"} style={{color: 'white'}}
                                     className={({isActive}) => isActive ? style.active : null}>Ads</NavLink></li>
                        <li><NavLink to={"/about"} style={{color: 'white'}}
                                     className={({isActive}) => isActive ? style.active : null}>About
                            us</NavLink></li>
                    </ul>
                    <DropdownButton id="dropdown-basic-button" variant="light" title={user}
                                    style={{display: isLoggedIn ? 'inline-block' : 'none'}}>
                        <Dropdown.Item href="#/action-1" onClick={nav1}>My ads</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={nav2}>My dialogs</Dropdown.Item>
                        <Dropdown.Item  onClick={nav3}>My page</Dropdown.Item>
                        <Dropdown.Item href="#/action-4" onClick={logOut}>Log out</Dropdown.Item>
                    </DropdownButton>
                    <div style={{display: isLoggedIn ? 'none' : 'inline-block'}}>
                        <NavLink to={"/auth"} style={{textDecoration:"none"}}><Button
                            collor="inherit" variant="outlined"
                            style={{color: 'white', borderColor: "white", margin: '5px'}}>Log in</Button></NavLink>

                        <NavLink to={"/reg"} style={{textDecoration:"none"}}><Button
                            color="secondary" variant="contained">Sign up</Button></NavLink>
                    </div>
                </Toolbar>
            </Container>
        </SimpleHeader>
    );
}

export default Header;
