import React, {useEffect, useRef, useState} from 'react';
import s from './unconfirmed.module.css'
import classNames from "classnames";
import * as SVGLoaders from "svg-loaders-react";
import {useSelector} from "react-redux";

const Unconfirmed = () => {
    const [isVisible, setIsVisible] = useState(true)
    const modal = useRef();
    const user = useSelector((state)=>state.dataBase.user)
    const closeModalHandler = () => {
        setIsVisible(false)
    }
    const BackDrop = () => {
        return (
            <div
                className={s.backdrop}>
            </div>
        )
    }

    useEffect(() => {
        let timer = setInterval(() => {
            if (modal.current && modal.current.style !== 'block') {
                modal.current.style.display = 'block';
            }
        }, 2000)
        return () => {
            clearInterval(timer)
        }

    }, [isVisible])

    const Modal = () => {
        return (
            <div className={s.modal}>
                <i onClick={closeModalHandler} className={classNames("fa-solid fa-xmark", s.close)}></i>
                <p>Мы выслали вам письмо
                    на <span>{user}</span>. Перейдите пожалуйста по ссылке
                    закрёплённой в письме для подверждения почты. </p>
                <SVGLoaders.Oval className={s.loader} height={'40px'} width={'40px'} stroke="#278DF9"/>
            </div>

        )
    }
    return (
        <div>
            {isVisible && <div ref={modal} className={s.unconfirmed}>
                <BackDrop/>
                <Modal/>
            </div>}


        </div>
    );
};

export default Unconfirmed;