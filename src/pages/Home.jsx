import {useEffect, useRef} from 'react';
import s from './home.module.css'
import Exchange from "../components/Exchange.jsx";
const Home = () => {


    return (
        <div>
            <div className="container">
                <Exchange/>
            </div>
            <div className={'white_wrapper'}>
                <div className="container">
                    <h2>Добро пожаловать в CoinFlipper</h2>
                    <p>Конфиденциальность и безопасность клиента — наши ключевые преимущества.</p>
                    <p className={s.text}>Команда CoinFlipper в течение нескольких лет нарабатывала репутацию
                        надежного
                        обменника
                        криптовалют и опытного игрока на крипторынке, который ценит пользователей и их средства. Для нас
                        важно, чтобы ваши данные были тщательно защищены, а ваши деньги оставались вашими деньгами.
                        Поэтому
                        мы продолжаем уделять значительное внимание безопасным сделкам и защите системы и работаем
                        только с
                        надежными партнерами.</p>
                    <div >
                        <h2>Преимущества</h2>
                        <div className={s.advantages}>
                            <div className={s.advantage}>
                                <div>
                                    <img src='/1.png' alt=""/>
                                </div>
                                <div className={s.advantage_name}>
                                    Выгодный обмен
                                </div>
                                <div className={s.advantage_description}>
                                    Качественно меняем валюту онлайн.
                                </div>
                            </div>
                            <div className={s.advantage}>
                                <div>
                                    <img src='/2.png' alt=""/>
                                </div>
                                <div className={s.advantage_name}>
                                    Надежность на высоком уровне
                                </div>
                                <div className={s.advantage_description}>
                                    Если что-то пошло не так, мы всегда вернем вам деньги.
                                </div>
                            </div>
                            <div className={s.advantage}>
                                <div>
                                    <img src='/3.png' alt=""/>
                                </div>
                                <div className={s.advantage_name}>
                                    Быстрый обмен
                                </div>
                                <div className={s.advantage_description}>
                                    Мы обеспечим не только надежность и лучший курс, но и быстрый обмен.
                                </div>
                            </div>

                        </div>

                    </div>
                    <div  className={s.reviews_block}>
                        <h1>Последние отзывы CoinFlipper</h1>
                        <div>
                            <div className={s.review}>
                                <div className={s.reviewer}>
                                    Надежда 2023-01-15 09:26:08
                                </div>
                                <div>
                                    Быстро и удобно.
                                </div>
                                <div>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                </div>
                            </div>
                            <div className={s.review}>
                                <div className={s.reviewer}>
                                    Alex 2022-06-20 13:59:53

                                </div>
                                <div className={s.review_text}>
                                    Все ок, спасибо
                                </div>
                                <div className={s.stars}>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                </div>
                            </div>
                            <div className={s.review}>
                                <div className={s.reviewer}>
                                    Фил 2022-06-13 16:16:46
                                </div>
                                <div className={s.review_text}>
                                    Все быстро и удобно
                                </div>
                                <div className={s.stars}>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                    <i className="fa-solid fa-star" style={{color: "#3e3737"}}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;