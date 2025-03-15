import React from 'react';
import ListElement from "./ListElement.jsx";

const CryptoGiveList = ({list, onClick, active}) => {
    return (
        list.map((item) => {
            return <ListElement key={item.id} onClick={onClick} item={item} isActive={active === item}/>
        })
    );
};

export default React.memo(CryptoGiveList);