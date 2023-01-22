import React from "react";
import {Card} from "react-bootstrap";
//import style from "./ad.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const DialogTile = (props) => {

    return (
            <Card style={{margin:'10px'}}>
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