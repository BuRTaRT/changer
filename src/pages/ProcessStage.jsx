import React, {useEffect, useState} from 'react';
import s from './processStage.module.css'
import ProgressLine from "../ui/ProgressLine/ProgressLine.jsx";
import {useSelector} from "react-redux";

const ProcessStage = () => {
    const {giveCrypto, getCrypto, stage, operationNumber, date} = useSelector(state => state.dataBase)

    return (
        <div>
            <div className={s.image_block}>
                <div className={s.image_give}>
                    <img src={giveCrypto ? giveCrypto.image : ''} alt=""/>
                </div>
                <i className="fa-solid fa-arrow-right fa-fade fa-lg"></i>
                <div className={s.image_get}>
                    <img src={getCrypto ? getCrypto.image : ''} alt=""/>
                </div>
            </div>
            <div className={s.transaction_information_block1}>
                <div className={s.header}>Заявка №{operationNumber} принята в обработку!</div>
                <div>Мы обработаем вашу заявку после зачисления средств на наш счёт</div>
            </div>
            <ProgressLine stage={stage}/>
            <hr className={s.hr}/>
            <div className={s.transaction_details}>
                <div className={s.transaction_details_give}>
                    <div className={s.trans_details}>Детали транзакции отдаю</div>
                    <div className={s.img_block}>
                        <img src={giveCrypto ? giveCrypto.image : ""} alt=""/>
                        <div>{giveCrypto ? giveCrypto.id : ""}</div>
                    </div>
                    <div>Отправляете: <span
                        className={s.bold}>{giveCrypto.giveSum} {giveCrypto ? giveCrypto.symbol.toUpperCase() : ""}</span>
                    </div>
                    <div>время создания: {date ? date.date : ''}</div>
                </div>
                <div className={s.transaction_details_get}>
                    <div className={s.trans_details}>Детали транзакции получаю</div>
                    <div className={s.img_block}>
                        <img src={getCrypto && getCrypto.image} alt=""/>
                        <div>{getCrypto && getCrypto.id}</div>
                    </div>
                    <div>Получаете:<span
                        className={s.bold}> {getCrypto.getSum} {getCrypto && getCrypto.symbol.toUpperCase()}</span>
                    </div>
                    <div>время создания: {date ? date.date : ''}</div>

                </div>
            </div>

        </div>
    );
};

export default ProcessStage;