import React from "react";
import {Link, NavLink} from "react-router-dom";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {Image} from "react-bootstrap";
import logoImg from "../../UI/images/logo.png";
import style from "./header,.module.css";

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
    return (
        <SimpleHeader position="fixed">
            <Container>
                <Toolbar>
                    <LogoImage src={logoImg}></LogoImage>
                    <Teamder variant="h5">Teamder</Teamder>
                    <ul>
                        <li><a>Ads</a></li>
                        <li><a>About us</a></li>
                    </ul>

                    <Box mr={3}>
                        <Button collor="inherit" variant="outlined">Log in</Button>
                    </Box>
                    <Button color="secondary" variant="contained">Sign up</Button>
                </Toolbar>
            </Container>
        </SimpleHeader>
    );
}

export default Header;
