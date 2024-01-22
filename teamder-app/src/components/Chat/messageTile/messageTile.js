import React from "react";
import {Card, Dropdown} from "react-bootstrap";
//import style from "./ad.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {DOMEN_SERVER, DOMEN_SITE} from "../../../config/const";
import {useNavigate} from "react-router-dom";


const MessageTile = (props) => {

    const deleteMsg=event=>{
        props.del(props.post.id)
    }
    const updateMsg=event=>{
        props.update(props.post.id)
    }
    return (
        <Card style={{margin:'10px', backgroundColor: props.post.isRead ? '':'#B3E5FC'}}>
            <Card.Body>
                <blockquote className="blockquote mb-0" style={{textAlign:"left", display: 'grid', gridTemplateColumns: '7fr 3fr', gridTemplateRows:"6fr 1fr"}}>
                    <p style={{display:'inline-block'}}>
                        {props.post.text}
                    </p>
                    <div style={{textAlign:"right"}}>
                    <Dropdown style={{display: props.user==props.post.user_id ? 'inline-block':'none', width: '30px'}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{}}>
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item onClick={deleteMsg}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div/>
                    <footer className="blockquote-footer" style={{textAlign: "right"}}>
                        {props.post.date.split("T")[0]} {props.post.date.split("T")[1].split(".")[0]}
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>

    )


}
export default MessageTile;
