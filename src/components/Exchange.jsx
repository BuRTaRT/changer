import React, {useCallback, useMemo, useState} from 'react';
import s from './exchange.module.css';
import {useDispatch, useSelector} from "react-redux";
import {cryptoActions} from "../store/cryptoSlice.js";
import CryptoGiveList from "./CryptoGiveList.jsx";
import CryptoGetList from "./CryptoGetList.jsx";
import * as SVGLoaders from "svg-loaders-react";

const Exchange = () => {
    const {cryptosList: list, currencies, reserve} = useSelector((state) => state.cryptos)
    const [active, setActive] = useState(list[0]);
    const dispatch = useDispatch();
    const {setGiveCrypto, setGetCrypto} = cryptoActions;

    const getList = useMemo(() => list.filter(item => item !== active), [list, active])

    const setGiveCryptoHandler = useCallback((item) => {
        setActive(item);
        dispatch(setGiveCrypto(item))
    }, [dispatch])

    const setGetCryptoHandler = useCallback((item) => {
        dispatch(setGetCrypto(item))
    }, [dispatch])



    return (
        <div className='container'>
            <div className={s.change_block_container}>
                <div className={s.give_block}>
                    <div className={s.text5}>Вы отдаёте</div>
                    {currencies && <CryptoGiveList
                        list={list}
                        active={active}
                        onClick={setGiveCryptoHandler}
                    />}
                </div>
                <div className={s.get_block}>
                    <div className={s.text}>
                        <div className={s.text1}>Вы получаете</div>
                        <div className={s.text2}>курс</div>
                        <div className={s.text3}> резерв</div>
                    </div>
                    {currencies ? <CryptoGetList
                        currencies={currencies}
                        reserve={reserve}
                        active={active}
                        onClickItem={setGetCryptoHandler}
                        getList={getList}
                    /> : <SVGLoaders.Oval width={'auto'} height={'100px'} stroke="#278DF9"/>}
                </div>
            </div>
        </div>
    );
};

export default Exchange;