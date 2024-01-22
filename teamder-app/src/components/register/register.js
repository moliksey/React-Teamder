import React, {useState} from 'react';
import axios from 'axios';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import {MainContainer} from "../MainContainer";
import {Input} from "../Input";
import {Form} from "../Form";
import {PrimaryButton} from "../PrimaryButton";
import {Heading} from "../Heading";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";

const schema = yup.object().shape({
    username: yup
        .string()
        .required('Логин обязателен для заполнения'),
    password: yup
        .string()
        .min(4, 'Пароль должен содержать минимум 4 символа')
        .required('Пароль обязателен для заполнения'),
    password2: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
        .required('Повторите пароль'),
});

export default function Register() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const [reg, setReg] = useState(() => {
        return {
            username: "",
            password: "",
            password2: "",
        }
    })

    const changeInputRegister = event => {
        event.persist()
        setReg(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const submitCheckIn = event => {

        event.preventDefault();
        console.log(schema.isValid(reg))
        if (schema.isValid(reg)) {
            axios.post(DOMEN_SERVER + "/users", {
                username: reg.username,
                password: reg.password,
            }).then(res => {
                if (res.data) {
                    alert("Добро пожаловать, " + reg.username + "!")
                    navigate('/mainPage')
                } else {
                    alert("Этот никнейм занят :(")
                }
            }).catch(() => {
                alert("Какие-то беды :(")
            })
        }
    }
        return (<MainContainer>
            <Heading>Register user:</Heading>
            <Form onSubmit={submitCheckIn}>
                <Input
                    {...register('username')}
                    type="username"
                    id="username"
                    name="username"
                    value={reg.username}
                    onChange={changeInputRegister}
                    label="Login"
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                />
                <Input
                    {...register('password')}
                    type="password"
                    id="password"
                    name="password"
                    value={reg.password}
                    label="Password"
                    onChange={changeInputRegister}
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                />
                <Input
                    {...register('password2')}
                    type="password"
                    id="password2"
                    name="password2"
                    value={reg.password2}
                    label="Repeat password"
                    onChange={changeInputRegister}
                    error={!!errors.password2}
                    helperText={errors?.password2?.message}
                />
                <PrimaryButton type="submit">Register</PrimaryButton>
            </Form>
        </MainContainer>);
    }
