import React, {useEffect} from 'react';
import s from './about_us.module.css'

const AboutUs = () => {
    useEffect(() => {
        window.location = '#top'
    }, [])

    return (
        <div className={s.about_us}>
            <div className="container">
                <h2 className={s.about_us_name}>О нас / Контакты </h2>
                <div className={s.about_us_block}>
                    <p className={s.about_us_questions}>Кто мы?</p>
                    <p className={s.about_us_answers}>Обменный сервис самых востребованных платежных систем и
                        криптовалют. Наша компания создана в Эстонии в 2017 году, собрав опытную команду программистов и
                        трейдеров. На сегодняшний день сервис Exchangecryptostore прошел 2 апгрейда технической части
                        сайта и теперь предоставляет современные и качественные услуги по обмену различных валют.</p>
                    <p className={s.about_us_questions}>Что мы делаем?</p>
                    <p className={s.about_us_answers}>Мы предлагаем надежный сервис по обмену, продаже или покупке
                        популярных платежных систем и криптовалют. Воспользоваться услугами нашего сервиса можно в любое
                        время, также как и получить консультацию в онлайн чате у оператора.</p>
                    <p className={s.about_us_questions}>Как мы это делаем?</p>
                    <p className={s.about_us_answers}>Наш обменный сервис на сегодня проводит все операции в
                        автоматическом режиме, т.е. с участием робота, при этом время выполнения заявки займет от 1 до
                        30 минут в любое время суток. Для проведения обмена вам достаточно создать заявку и оплатить ее,
                        остальное мы сделаем сами.</p>
                    <p className={s.about_us_questions}>Почему мы это делаем?</p>
                    <p className={s.about_us_answers}>Мы стремимся создать качественный сервис, который будет полезен и
                        удобен для наших клиентов. Поэтому мы внимательно прорабатываем техническую сторону нашего
                        сервиса для обеспечения надежности и безопасности, а также продумываем в дизайне каждую мелочь,
                        чтобы обеспечить удобство использования сервиса.</p>
                    <p className={s.about_us_questions}>Наши контакты</p>
                    <p className={s.about_us_answers}>Чтобы связаться с нами, напишите в Telegram: @CoinFlipper_support
                        или обращайтесь в чат.</p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32468.865107728205!2d24.642048131249993!3d59.428003100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46929489ad311c05%3A0x65cf329b5c68ba7e!2zVMO2w7Z2w7VpbWUgTGlsbGVrw7xsYSBPZmZpY2U!5e0!3m2!1sru!2sde!4v1666253812751!5m2!1sru!2sde"
                        width="100%" height="450" style={{border: '0'}} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>


        </div>
    );
};

export default AboutUs;