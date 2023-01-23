import React from "react";
import {Card} from "react-bootstrap";
import style from "./ad.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import {useNavigate} from "react-router-dom";


const Ad = (props) => {
    const navigate = useNavigate();
    const goToUser=event=> {
        navigate('/you/'+props.post.userId)
    }
    console.log(props.post.ad.elo.length)
    return (
        <div className={style.MainPost}>
            <Card className="text-center">
                <Card.Header onClick={goToUser}>{props.post.ad.user_id}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.post.ad.tag}</Card.Title>
                    <Card.Text>
                        {props.post.ad.text}
                    </Card.Text>

                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Body>
                                <div>Мое эло: {props.post.ad.elo}</div>
                                <div>Я : {props.post.ad.gender}</div>
                                <div>Возраст от {props.post.ad.low_age_lvl} - до {props.post.ad.high_age_lvl}</div>
                                <div>Цель игры: {props.post.ad.goal_id}</div>
                                <div>{props.post.ad.game_id}</div>
                                </Accordion.Body>
                            <Accordion.Header>Show more</Accordion.Header>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
                <Card.Footer className="text-muted">{props.post.ad.date.split("T")[0]}</Card.Footer>
            </Card>
        </div>
    )


}
export default Ad;