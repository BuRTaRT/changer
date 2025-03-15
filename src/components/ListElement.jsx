import React from 'react';
import s from "./exchange.module.css";
import classNames from "classnames";

const ListElement = ({item, isActive, onClick}) => {
    return (
        <div key={item.name}
             onClick={() => onClick(item)}
             className={classNames(s.crypto_element, {[s.active]: isActive})}>
            <div className={s.cryto_img}><img src={item.image} alt=""/></div>
            <div className={s.crypto_name}>{item.name}</div>
        </div>
    );
};

export default React.memo(ListElement);