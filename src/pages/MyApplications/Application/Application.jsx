import React from 'react';
import s from './application.module.css'
import {NavLink} from "react-router-dom";

const Application = (props) => {
    return (
        <li className={s.li}>
            <NavLink className={s.link} onClick={() => {
                localStorage.current = props.id;
                window.location = '#top'
            }} to={'/operation'}>
                <div className={s.application}>
                    <div className={s.application_id}>№ заявки: {props.operationNumber}</div>
                    <div className={s.application_info}>
                        <div className={s.give_get_img}>
                            <div className={s.give}>
                                <div className={s.give_img}><img src={props.giveImage} alt=""/></div>
                            </div>
                            <div className={s.arrow}><i className="fa-solid fa-arrow-right fa-fade"/></div>
                            <div className={s.get}>
                                <div className={s.get_img}><img src={props.getImage} alt=""/></div>
                            </div>
                        </div>
                        <div className={s.give_get_info}>
                            <div className={s.give_sum}> {props.givesum} {props.give.symbol.toUpperCase()}</div>
                            <i className={`fa - solid fa-arrow-right fa-xs ${s.down}`}/>
                            <div className={s.get_sum}>{+props.getsum} {props.get.symbol.toUpperCase()}</div>
                        </div>
                        <div className={s.stage}>
                            {props.stage === 0 ? <p><i
                                    className={`fa - regular fa-hourglass fa-xl ${s.hourglass}`}></i> Ожидается оплата
                                </p> :
                                props.stage === 1 ? <p><i
                                        className={`fa - regular fa-hourglass fa-xl ${s.hourglass}`}></i> Ожидаем
                                        поступления средств </p> :
                                    props.stage === 2 ? <p><i
                                            className={`fa - regular fa-hourglass fa-xl ${s.hourglass}`}></i> Ожидаем
                                            подтверждения сети </p> :
                                        props.stage === 3 ? <p>Выполняем обмен</p> :
                                            props.stage === 4 ?
                                                <p><i className={`fa - solid fa-check fa-2xl ${s.stage4}`}
                                                ></i>Обмен Завершён </p> :
                                                props.stage === 200 ? <p><i
                                                    className={`fa - solid fa-xmark fa-fade fa-2xl ${s.error}`}></i>Ошибка
                                                    сети
                                                </p> : ''}
                        </div>
                    </div>
                </div>
            </NavLink>
        </li>
    );
};

export default Application;