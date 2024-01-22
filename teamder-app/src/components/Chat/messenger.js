import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { socketUrl} from '../../config/const';
import {Button, DropdownButton} from "react-bootstrap";
import MessageTile from "./messageTile/messageTile";
import s from "./chat.module.css"
import Form from "react-bootstrap/Form";
import socketIOClient from "socket.io-client";
import ReactDOM from 'react-dom';
import EmojiPicker from "emoji-picker-react";
import Dropdown from 'react-bootstrap/Dropdown';
import {useParams} from "react-router-dom";
export default function Messenger() {
    const params = useParams();
    const dialog_id = params.id;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isEffect, setEffect] = useState(true);
    const [user, setUser] = useState('')
    const socket = socketIOClient(socketUrl);
    const krut = useRef(null);
    const scrollToDivRef = () => {
        let node = ReactDOM.findDOMNode(krut.current);
        node.scrollTop = node.scrollHeight;
    }
    useEffect(() => {
            //this.prokrutka= React.createRef();
            if (messages.length < 1 && isEffect) {
                setEffect(false);
                ;
                socket.on("connect", data => {

                });

                socket.emit('get messages', {dialogId: dialog_id, authorization: `Bearer ${localStorage.getItem('token')}`})
                socket.on('get messages', (data) => {
                    setUser(data.user)
                    setMessages([...data.messages]);

                })

            }
            scrollToDivRef();
        }
    );

    const changeInputAuth = event => {
        event.persist()
        setNewMessage(event.target.value)

    }

    function submitMess() {

        if(newMessage!=""){
        socket.emit("addMessage", {
            text: newMessage,
            authorization: `Bearer ${localStorage.getItem('token')}`,
            dialogId: dialog_id
        })
        setNewMessage("")}


    }

    function deleteMsg(val) {
        socket.emit("delMessage", {
            id: val,
            authorization: `Bearer ${localStorage.getItem('token')}`,
            dialogId: dialog_id
        })
    }



    socket.on("addMessage", (data) => {

        setMessages([...data.messages]);
    })
    socket.on("delMessage", (data) => {

        setMessages([...data.messages]);
    })
    function updateMsg(val) {
        if(newMessage!=""){
        socket.emit("updateMessage", {
            id: val,
            text: newMessage,
            authorization: `Bearer ${localStorage.getItem('token')}`,
            dialogId: dialog_id
        })
        setNewMessage("")}
    }
    function onEmojiClick(emoji){
        setNewMessage(prev=>{
            return prev+emoji.emoji;
        })
    }
    socket.on("updateMessage", (data) => {
        setMessages([...data.messages]);
    })
    let posts = messages.map(el => <div><MessageTile user={user} post={el} update={updateMsg} del={deleteMsg}/></div>)
    return (
        <div>
            <Form>
                <div style={{textAlign: "center"}}>
                    <div className={s.prokrutka} id="meswind" ref={krut}>
                        {posts}
                    </div>
                </div>
                <div style={{textAlign: "center", display: 'grid', gridTemplateColumns: '10fr 3fr 67fr 10fr 10fr'}}>
                    <div/>
                    <DropdownButton id="dropdown-basic-button" style={{display: 'inline-block', width: '98%', height:'100px'}} >
                        <Dropdown.Item href="#/action-1"><EmojiPicker onEmojiClick={onEmojiClick} /></Dropdown.Item>
                    </DropdownButton>
                    <Form.Group className="mb-3"
                                style={{display: 'inline-block', width: '98%', marginRight: '3px'}}>
                        <Form.Control as="textarea" name="text" id="text" rows={3} value={newMessage}
                                      style={{margin: '5px'}}
                                      onChange={changeInputAuth}/>
                    </Form.Group>
                    <Button style={{display: 'inline-block', width: '98%', height:'100px'}} onClick={submitMess}>Отправить</Button>

                    <div/>
                </div>
            </Form>
        </div>
    )
}
