import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import s from "./exchange.module.css";

const CryptoGetList = ({getList, onClickItem, currencies, active, reserve}) => {
    const navigate = useNavigate();

    const handleClick = (item) => {
        onClickItem(item);
        navigate('/exchangeForm');
    }
    return getList.map((item, index) => {
        const currency = currencies[active.id][item.symbol];
        const inReserve = reserve[item.id]

        return <div onClick={() => handleClick(item)} key={item.id}>
            <div key={index} className={s.crypto_element}>
                <div className={s.name_img}>
                    <div className={s.cryto_img}><img src={item.image} alt=""/></div>
                    <div className={s.crypto_name}>{item.name}</div>
                </div>
                <div className={s.crypto_currency}><span>1</span> <i
                    className={`fa-solid fa-arrow-right ${s.arrow}`}></i>
                    <span>{currency}</span></div>
                <div className={s.crypto_reserv}>{inReserve}</div>
            </div>
        </div>
    })


};

export default CryptoGetList;