import React, {useState} from 'react';
import axios from 'axios';
import {DOMEN_SERVER, DOMEN_SITE} from '../../config/const';
import {Typography} from "@mui/material";
import styled from "@emotion/styled";
import {Input} from "../Input";
import {PrimaryButton} from "../PrimaryButton";
import {MainContainer} from "../MainContainer";
import {Form} from "../Form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {useNavigate} from "react-router-dom";

const Heading = styled(Typography)`
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: "Permanent Marker";
  text-align: center;
  font-size: 40px;
  color: deeppink;
  text-shadow: 1px 1px darkmagenta;
`;

const schema = yup.object().shape({
    username: yup
        .string()
        .required('Введите логин'),
    password: yup
        .string()
        .required('Введите пароль'),
});


export default function Authentication() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const [auth, setAuth] = useState(() => {
        return {
            username: "",
            password: "",
        }
    })

    const changeInputAuth = event => {
        event.persist()
        setAuth(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }


    const submitCheckIn = event => {
        event.preventDefault();
        if(schema.isValidSync(auth)) {
            axios.post(DOMEN_SERVER + "/login", {
                username: auth.username,
                password: auth.password,
            }).then(res => {
                if (res.data) {

                    if (res.data.token)
                    {localStorage.setItem('token', res.data.token);
                    navigate('/mainPage');}
                    else alert("У вас нет токена")
                } else {
                    alert("Вы ввели неправильное имя пользователя или пароль")
                }
            }).catch(() => {
                alert("Какая-то беда :(")
            })
        }
    }
    return (<MainContainer>
        <Heading>Authorization:</Heading>
        <Form onSubmit={submitCheckIn}>
            <Input
                {...register('username')}
                type="username"
                id="username"
                name="username"
                value={auth.username}
                onChange={changeInputAuth}
                label="Login"
                error={!!errors.username}
                helperText={errors?.username?.message}
            />
            <Input
                {...register('password')}
                type="password"
                id="password"
                name="password"
                value={auth.password}
                onChange={changeInputAuth}
                label="Password"
                error={!!errors.password}
                helperText={errors?.password?.message}
            />
            <PrimaryButton type="submit">Login</PrimaryButton>
        </Form>
    </MainContainer>);
}
