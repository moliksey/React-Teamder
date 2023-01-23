import React from "react";
import {Card} from "react-bootstrap";
//import style from "./ad.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";


const DialogTile = (props) => {
    const navigate = useNavigate();
    const nav = event => {
        event.persist()
        navigate("/dialog/"+props.post.id);
    }

    return (
            <Card style={{margin:'10px'}} onClick={nav}>
                <Card.Header>{props.post.opname}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0" style={{textAlign:"left"}}>
                        <p>
                            {props.post.text}
                        </p>
                        <footer className="blockquote-footer">
                            {props.post.date.split("T")[0]} {props.post.date.split("T")[1].split(".")[0]}
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>

    )


}
export default DialogTile;