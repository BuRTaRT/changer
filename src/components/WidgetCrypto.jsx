import React, {useEffect} from 'react';
import s from "./WidgetCrypto.module.css";

const WidgetCrypto = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cryptorank.io/widget/marquee.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // Убираем скрипт при размонтировании
        };
    }, []);
    return (
        <div className={s.widget_container}>
            {/*<div className={s.widget} id="crypto-widget-CoinMarquee" data-transparent="true"*/}
            {/*     data-design="classic"*/}
            {/*     data-coin-ids="1,166,136,382,1120,440,20,29,1381,1986"></div>*/}
            <div className={s.widget}
                id="cr-widget-marquee"
                data-coins="bitcoin,ethereum,tether,ripple,cardano"
                data-theme="light"
                data-show-symbol="true"
                data-show-icon="true"
                data-show-period-change="true"
                data-period-change="24H"
                data-api-url="https://api.cryptorank.io/v0"
            >
            </div>
        </div>
    );
};

export default WidgetCrypto;