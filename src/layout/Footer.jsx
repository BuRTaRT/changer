import React from 'react'
import s from './Footer.module.css'
import '../App.css'


import {NavLink} from "react-router-dom";



let Footer = (props) => {
    return (
        <div className={s.whole_footer}>
            <div className='container'>
            </div>
            <div className={s.footer}>
                <div className="container">
                    <div className={s.footer_nav}>
                        <div className={s.footer_nav_item}>
                            <h3>Компания</h3>
                            <NavLink className={s.link} onClick={() => {
                                window.location = '#top'
                            }} to={"/about_us"}> о нас</NavLink>
                            <NavLink className={s.link} onClick={() => {
                                window.location = '#top'
                            }} to={"myApplications"}> мои заявки</NavLink>
                        </div>
                        <div className={s.footer_nav_item}>
                            <h3>Контакты</h3>
                            <NavLink to={'/about_us'} className={s.link}>связаться с нами</NavLink>
                            <a className={s.link} href={'https://t.me/CoinFlipper_support'}>телеграм</a>
                            <a className={s.link} href="mailto:someone@yoursite.com">почта</a>
                        </div>
                        <div className={s.footer_nav_item}>
                            <h3>Аккаунт</h3>
                            <NavLink className={s.link} to={'/registration'}>Зарегистрироваться</NavLink>
                            <NavLink className={s.link} to={'/signIn'}>Вход</NavLink>
                        </div>
                        <div className={s.footer_nav_item}>
                            <h3>Информация</h3>
                            <NavLink to={'/faq'} className={s.link}>FAQ</NavLink>
                            <a className={s.link} href={"/public/dogovor/UserAgreement.pdf"} target={"_blank"}>Условия Соглашения</a>
                        </div>
                    </div>
                </div>

            </div>


        </div>


    )
}

export default Footer