import React, {useEffect, useState} from 'react';
import * as SVGLoaders from "svg-loaders-react";
import s from './waitStage.module.css';
import bitcoin from '../assets/qrs/bitcoinQR.png'
import ethereum from '../assets/qrs/ethereumQR.png'
import litecoin from '../assets/qrs/litecoinQR.png'
import bnb from '../assets/qrs/bnbQR.png'
import cosmos from '../assets/qrs/cosmosQR.png'
import polkadot from '../assets/qrs/PolkadotQR.png'
import ripple from '../assets/qrs/xrpQR.png'
import solana from '../assets/qrs/solanaQR.png'
import tether from '../assets/qrs/TetherQR.png'
import cardano from '../assets/qrs/cardanoQR.png'
import dogecoin from '../assets/qrs/dogecoinQR.png'
import tron from '../assets/qrs/tronQR.png'
import {Navigate, useNavigate} from "react-router-dom";
import Loader from "../ui/Loader/Loader.jsx";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import {useSelector} from "react-redux";
import {fancyTimeFormat} from "../helpers/fancyTimeFormat.js";
import {startProcess, stopProcess} from "../store/dataBaseSlice.js";

dayjs.extend(duration);


const WaitStage = () => {

    const [isFetching, setFetching] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const data = useSelector((state) => state.dataBase)
    const {wallets} = useSelector(state => state.cryptos)
    const [copied, setCopied] = useState(false);
    const [copied2, setCopied2] = useState(false);
    const [expired, setExpired] = useState(false)
    const [time, setTime] = useState(0);
    const nav = useNavigate()

    useEffect(() => {
        if (data && dayjs(data.date.dateExpires).diff(dayjs(), 'seconds') <= 0) {
            setExpired(true)
        } else setTime(fancyTimeFormat((dayjs(data.date.dateExpires).diff(dayjs(), 'seconds'))))
    }, [data])


    let timer = setTimeout(() => {
        if (data.date && dayjs(data.date.dateExpires).diff(dayjs(), 'seconds') <= 0) {
            setExpired(true);
            clearTimeout(timer);
        } else {
            const diffInSeconds = dayjs(data.date.dateExpires).diff(dayjs(), 'seconds');
            setTime(fancyTimeFormat(diffInSeconds));
            setFetching(false)
            setExpired(false)
        }
    }, 1000);

    const totalWidthUnits = 1800;
    let currentWidth;

    if (dayjs(data.date.dateExpires).diff(dayjs(), 'seconds') <= 0) {
        currentWidth = 0;
    } else {
        currentWidth = dayjs(data.date.dateExpires).diff(dayjs(), 'seconds');
    }

    let width = (totalWidthUnits - currentWidth) / 18;

    return (
        <div>
            {redirect ? <Navigate to={'/'}/> :
                data.date ? <div>
                    <Loader isFetching={isFetching}/>
                    <div className={s.operation_header}>
                        <div className={s.header_elem}>Ожидается оплата</div>
                        <div className={s.header_elem}>№{data.operationNumber}</div>
                    </div>
                    <div className={s.progress_block}>
                        <div className={s.progress_img}><SVGLoaders.Oval width={'40px'} stroke="#278DF9"/></div>
                        <div className={s.progress}>
                            <div className={s.progress_text}> оплатите заявку в течении: {expired ?
                                <span className={s.expired}>просрочена</span> : <span>{time} минут</span>} </div>
                            <div className={s.progress_bar}>
                                <div style={{width: `${width}%`}} className={s.progress_bar_progress}></div>
                            </div>
                        </div>

                    </div>

                    <div className={s.give_get_block}>
                        <div className={s.give_get_wrapper}>
                            <div className={s.give_block}>
                                <div className={s.give_block_info}>
                                    <div className={s.hide}>вы отправляете</div>
                                    <div
                                        className={s.hide}>{data.giveCrypto.giveSum} {data.giveCrypto ? data.giveCrypto.symbol.toUpperCase() : ''}</div>
                                    <div
                                        className={s.hide}>{data.giveCrypto ? `${data.giveCrypto.name} ${data.giveCrypto.symbol.toUpperCase()} ` : ''}</div>
                                </div>
                                <div className={s.give_block_img}><img
                                    src={data.giveCrypto ? data.giveCrypto.image : ''} alt=""/></div>
                            </div>
                            <div className={s.arrow}><i className="fa-solid fa-arrow-right fa-fade fa-lg"></i></div>
                            <div className={s.give_block}>
                                <div className={s.give_block_img}><img src={data.getCrypto ? data.getCrypto.image : ''}
                                                                       alt=""/></div>
                                <div className={s.give_block_info_rigth}>
                                    <div className={s.hide}>вы получаете</div>
                                    <div
                                        className={s.hide}>{data.getCrypto.getSum} {data.getCrypto ? data.getCrypto.symbol.toUpperCase() : ''}</div>
                                    <div
                                        className={s.hide}>{data.getCrypto ? `${data.getCrypto.name} ${data.getCrypto.symbol.toUpperCase()} ` : ''}</div>
                                </div>

                            </div>
                        </div>
                        <div className={s.small_text}>вы отправляете {data.giveCrypto.giveSum} {data.giveCrypto ? data.giveCrypto.symbol.toUpperCase() : ''} и
                            получаете {data.getCrypto.getSum} {data.getCrypto ? data.getCrypto.symbol.toUpperCase() : ''}</div>
                    </div>

                    <div className={s.info_block}>
                        <div className={s.transfer_info}>
                            <div className={s.transfer}>
                                <div className={s.transfer_text}>Переведите</div>
                                <div onClick={() => {
                                    navigator.clipboard.writeText(data.giveCrypto.giveSum);
                                    setCopied2(true);
                                    setTimeout(() => {
                                        setCopied2(false)
                                    }, 800)
                                }} className={copied2 ? `${s.disapear} ${s.transfer_block}` : `${s.transfer_block}`}>
                                    <div className={s.transfer_sum}>{data.giveCrypto.giveSum}</div>
                                    <div className={s.transfer_copy}><i className="fa-solid fa-copy"
                                                                        style={{color: '#ffffff'}}></i></div>
                                </div>
                            </div>
                            <div className={s.transfer}>
                                <div className={s.transfer_text}>На адрес {data.giveCrypto ? data.giveCrypto.symbol.toUpperCase() : ''}</div>
                                <div onClick={() => {
                                    navigator.clipboard.writeText(wallets[data.giveCrypto.id])
                                    setCopied(true);
                                    setTimeout(() => {
                                        setCopied(false)
                                    }, 800)
                                }} className={copied ? `${s.disapear} ${s.transfer_block}` : `${s.transfer_block}`}>
                                    <div
                                        className={s.transfer_sum}>{data.giveCrypto && wallets[data.giveCrypto.id]} </div>
                                    <div className={s.transfer_copy}><i className={`${s.self} fa - solid fa-copy`}
                                                                        style={{color: '#ffffff'}}></i></div>
                                </div>

                            </div>
                            <div className={`${s.qr_block} ${s.xs}`}>
                                <div className={s.qr_container}>
                                    {data.giveCrypto.id === 'bitcoin' ? <img src={bitcoin} alt=""/> :
                                        data.giveCrypto.id === 'ethereum' ? <img src={ethereum} alt=""/> :
                                            data.giveCrypto.id === 'litecoin' ? <img src={litecoin} alt=""/> :
                                                data.giveCrypto.id === 'binancecoin' ? <img src={bnb} alt=""/> :
                                                    data.giveCrypto.id === 'polkadot' ? <img src={polkadot} alt=""/> :
                                                        data.giveCrypto.id === 'solana' ? <img src={solana} alt=""/> :
                                                            data.giveCrypto.id === 'ripple' ?
                                                                <img src={ripple} alt=""/> :
                                                                data.giveCrypto.id === 'cosmos' ?
                                                                    <img src={cosmos} alt=""/> :
                                                                    data.giveCrypto.id === 'tether' ?
                                                                        <img src={tether} alt=""/> :
                                                                        data.giveCrypto.id === 'cardano' ?
                                                                            <img src={cardano} alt=""/> :
                                                                            data.giveCrypto.id === 'dogecoin' ?
                                                                                <img src={dogecoin} alt=""/> :
                                                                                data.giveCrypto.id === 'tron' ?
                                                                                    <img src={tron} alt=""/> : ''
                                    }

                                    <h3>QR код для оплаты</h3>
                                </div>

                            </div>
                            <div className={s.tip}>
                                <div className={s.tip_text}>После осуществления перевода, обязательно нажмите кнопу "Я
                                    оплатил"
                                    и
                                    ожидайте завершения обмена
                                </div>
                            </div>


                        </div>
                        <div className={s.qr_block}>
                            <div className={s.qr_container}>
                                {data.giveCrypto.id === 'bitcoin' ? <img src={bitcoin} alt=""/> :
                                    data.giveCrypto.id === 'ethereum' ? <img src={ethereum} alt=""/> :
                                        data.giveCrypto.id === 'litecoin' ? <img src={litecoin} alt=""/> :
                                            data.giveCrypto.id === 'binancecoin' ? <img src={bnb} alt=""/> :
                                                data.giveCrypto.id === 'polkadot' ? <img src={polkadot} alt=""/> :
                                                    data.giveCrypto.id === 'solana' ? <img src={solana} alt=""/> :
                                                        data.giveCrypto.id === 'ripple' ? <img src={ripple} alt=""/> :
                                                            data.giveCrypto.id === 'cosmos' ?
                                                                <img src={cosmos} alt=""/> :
                                                                data.giveCrypto.id === 'tether' ?
                                                                    <img src={tether} alt=""/> :
                                                                    data.giveCrypto.id === 'cardano' ?
                                                                        <img src={cardano} alt=""/> :
                                                                        data.giveCrypto.id === 'dogecoin' ?
                                                                            <img src={dogecoin} alt=""/> :
                                                                            data.giveCrypto.id === 'tron' ?
                                                                                <img src={tron} alt=""/> : ''
                                }
                                <h3>QR код для оплаты</h3>
                            </div>
                        </div>
                    </div>
                    <div className={s.buttons_block}>
                        <button disabled={expired ? true : false} onClick={() => {
                            startProcess();
                            window.location.href = '#top'
                        }} className={!expired ? s.btn_accept : s.btn_accept_expired}>{!expired ?
                            'Я оплатил' : <span className={s.expired}>Просрочена</span>}
                        </button>
                        <button onClick={() => {
                            stopProcess()
                            nav('/myApplications')
                        }} className={s.btn_decline}>Отменить
                        </button>
                    </div>
                </div> : ''}
        </div>
    );
};

export default WaitStage;