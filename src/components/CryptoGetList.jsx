import React from 'react';
import {Link} from "react-router-dom";
import s from "./exchange.module.css";

const CryptoGetList = ({getList, onClickItem, currencies, active, reserve}) => {
    return (getList.map((item, index) => {
            return <Link key={index} style={{textDecoration: 'none'}} to={'/exchangeForm'}>
                <div onClick={() => onClickItem(item)} key={index} className={s.crypto_element}>
                    <div className={s.name_img}>
                        <div className={s.cryto_img}><img src={item.image} alt=""/></div>
                        <div className={s.crypto_name}>{item.name}</div>
                    </div>
                    <div className={s.crypto_currency}><span>1</span> <i
                        className={`fa-solid fa-arrow-right ${s.arrow}`}></i>
                        <span>{currencies[active.id][item.symbol]}</span></div>
                    <div className={s.crypto_reserv}>{reserve[item.id]}</div>
                </div>
            </Link>
        })
    );
};

export default CryptoGetList;