import React from 'react';
import s from "./WidgetCrypto.module.css";

const WidgetCrypto = () => {
    return (
        <div className={s.widget_container}>
            <div className={s.widget} id="crypto-widget-CoinMarquee" data-transparent="true"
                 data-design="classic"
                 data-coin-ids="1,166,136,382,1120,440,20,29,1381,1986"></div>
        </div>
    );
};

export default WidgetCrypto;