import {useState} from 'react';
import s from './header.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import WidgetCrypto from "../components/WidgetCrypto.jsx";
import {useDispatch, useSelector} from "react-redux";
import {logOff} from "../store/dataBaseSlice.js";

const Header = () => {
    const [isOpen, setOpen] = useState(false);
    const dispatch = useDispatch()
    const user = useSelector(state => state.dataBase.user)
    const nav = useNavigate()
    const closeMenu = () => {
        setOpen(false)
    }
    const openMenu = () => {
        setOpen(true)
    }
    const onLogOff = () => {
        const exit = confirm('Вы уверены что хотите выйти?');
        if (exit) {
            dispatch(logOff())
            nav('*')
        }
    }

    return (
        <div className={s.top} id={'top'}>
            <div className="container">
                <div className={s.login_section}>
                    <div className={s.support_container}>
                        <a className={s.href} href="mailto:support@coinflipper.pro"><i
                            className={`fa-regular fa-envelope s ${s.telegram}`}></i><span>support@coinflipper.pro</span></a>
                        <a className={s.href} href={'https://t.me/CoinFlipper_support'}><i
                            className={`fa-brands fa-telegram fa-xl ${s.telegram}`}></i><span>CoinFlipper_support</span></a>
                    </div>

                    {!user ? <div className={s.login_container}>
                        <div className={s.auth_element}>
                            <NavLink to={'/signIn'} onClick={() => {
                            }} className={s.elem}>Вход
                            </NavLink>
                        </div>
                        <div className={s.auth_element}>
                            <NavLink to={'/registration'} className={s.elem}>Регистрация</NavLink>
                        </div>
                    </div> : <div className={s.login_container}><p className={s.user}><span>{user}</span></p>
                        <div onClick={onLogOff} className={s.auth_element}>
                            <div className={s.elem}>Выход</div>
                        </div>
                    </div>}
                </div>
            </div>
            <div className={s.header}>
                <div className="container">

                    <div className={s.header_container}>
                        <div className={s.logo_container}>
                            <NavLink to={'/'}> <img src='/coinflipper.png' alt=""/></NavLink>
                        </div>
                        <nav className={isOpen ? `${s.nav} ${s.open}` : `${s.nav} ${s.closed}`}>
                            <div className={s.close}><span>Меню</span>
                                <div onClick={closeMenu} className={s.close_btn}><i
                                    className="fa-solid fa-xmark"></i></div>
                            </div>
                            <NavLink onClick={closeMenu} to={''} className={s.nav_item}>Главная</NavLink>
                            <NavLink onClick={closeMenu} to={'/about_us'} className={s.nav_item}>О нас</NavLink>
                            <NavLink onClick={closeMenu} to={'/myApplications'} className={s.nav_item}>Мои
                                заявки</NavLink>
                            <NavLink onClick={closeMenu} to={'/reviews'} className={s.nav_item}>Отзывы</NavLink>
                            <a href='/dogovor/UserAgreement.pdf' target={"_blank"} className={s.nav_item}>Условия
                                соглашения</a>
                        </nav>
                        <div onClick={openMenu} className={s.burger_btn}>
                            <span></span>
                        </div>
                    </div>
                    <WidgetCrypto/>
                    {/*<MyCarousel/>*/}
                </div>
            </div>

        </div>
    );
};

export default Header;