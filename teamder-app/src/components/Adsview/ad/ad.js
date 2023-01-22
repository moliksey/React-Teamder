import React from "react";
import {Card} from "react-bootstrap";
import style from "./ad.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';


const Ad = (props) => {

    return (
        <div className={style.MainPost}>
            <Card className="text-center">
                <Card.Header>{props.post.user_id}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.post.tag}</Card.Title>
                    <Card.Text>
                        {props.post.text}
                    </Card.Text>

                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Body>
                                <div>Мое эло: {props.post.elo}</div>
                                <div>Я : {props.post.gender}</div>
                                <div>Возраст от {props.post.low_age_lvl} - до {props.post.high_age_lvl}</div>
                                <div>Цель игры: {props.post.goal_id}</div>
                                <div>{props.post.game_id}</div>
                                </Accordion.Body>
                            <Accordion.Header>Show more</Accordion.Header>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
                <Card.Footer className="text-muted">{props.post.date.split("T")[0]}</Card.Footer>
            </Card>
        </div>
    )


}
export default Ad;