import {useSelector} from "react-redux";
import s from './exchangeForm.module.css'
import {FormProvider, useForm} from "react-hook-form";
import {startOperation} from "../store/dataBaseSlice.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Loader from "../ui/Loader/Loader.jsx";
import MySelect from "./mySelect.jsx";
import MyInput from "./MyInput.jsx";

const ExchangeForm = () => {
    const [isFetching, setIsFetching] = useState(false);
    const user = useSelector(state => state.dataBase.user);
    const nav = useNavigate();
    const {
        currencies,
        giveCrypto,
        getCrypto,
        regEx,
    } = useSelector((state) => state.cryptos);
    let price = currencies && parseFloat(currencies[giveCrypto.id][getCrypto.symbol])
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        watch,
        trigger,
        control
    } = useForm({mode: "all"})

    const methods = {
        watch, setValue, trigger, control, register, errors
    }

    const onSubmit = async (data) => {
        const giveCryptoObj = {
            giveSum: data.giveCrypto,
            ...giveCrypto
        }
        const getCryptoObj = {
            ...getCrypto,
            getSum: data.getCrypto,
        }
        setIsFetching(true)
        await startOperation(giveCryptoObj, getCryptoObj, data.wallet, user || data.email, user)
        nav('/operation')
    }


    return (
        <div className={s.exchange}>
            <div className="container">
                <Loader isFetching={isFetching}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormProvider {...methods}>
                    <div className={s.exchange_block}>
                        <div className={s.exchange_inner1}>
                            <h2>Обмен {giveCrypto.name} на {getCrypto.name}</h2>
                            <div className={s.warning}>
                                <p style={{color: 'green'}}>Внимание!</p>
                                <p>Примечание: Данная операция выполняется в автоматическом режиме, т.е. с
                                    участием
                                    робота и
                                    занимает от 5 до 30 минут в рабочее время (ежедневно с 8:00 до 24:00
                                    GMT).</p>
                            </div>
                            <div id={'center'} className={s.get_give_block}>
                                Курс обмена: <span
                                className={s.bold}> 1 {giveCrypto.name} = {price} {getCrypto.name} </span>
                                <h2>Отдаёте {giveCrypto.name}</h2>
                                <div className={s.give}>
                                        <MySelect
                                            type={'give'}
                                            name={"giveCryptoSelect"}
                                        />
                                    <div className={s.sum}>
                                        <div className={s.sum_text}>сумма<span className={s.star}>*</span>:
                                        </div>

                                            <MyInput type={'give'} name={'giveCryptoInput'}/>
                                    </div>
                                </div>
                                <hr className={s.hr}/>
                                <h2>Получаете</h2>
                                <div className={s.get}>
                                        <MySelect
                                            name={"getCryptoSelect"}
                                        />
                                    <div className={s.sum}>
                                        <div className={s.sum_text}>сумма<span className={s.star}>*</span>:
                                        </div>
                                            <MyInput type={'get'} name={'getCrypto'}/>
                                    </div>
                                </div>

                                <div className={s.wallet}>
                                    <div className={s.wallet_inner}>
                                        <span>на счёт:</span>
                                        <input autoComplete='off'
                                               className={s.input}
                                               type="text"
                                               {...register('wallet', {
                                                   required: "Обязательно",
                                                   pattern: {
                                                       value: new RegExp(regEx[getCrypto.id], 'i'),
                                                       message: 'Неверный формат кошелька'
                                                   }
                                               })}
                                               onBlur={() => trigger('wallet')}

                                        />
                                        {errors.wallet && <p className={s.error}>{errors.wallet.message}</p>}
                                    </div>
                                    {!user && <div className={s.field2}>
                                        <span>Ваш email</span>
                                        <input autoComplete='off'
                                               className={`${s.input}`}
                                               type="text"
                                               {...register('email', {
                                                   required: 'Поле Обязательно',
                                                   pattern: {
                                                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                       message: "Неверный формат емейла"
                                                   }
                                               })}
                                               onBlur={() => trigger('email')}
                                        />
                                        {errors.email && <p className={s.error}>{errors.email.message}</p>}
                                    </div>}
                                </div>
                                <hr className={s.hr}/>
                                <div className={s.submit}>
                                    <div className={s.checkbox}>
                                        <input
                                            {...register('checkbox', {
                                                required: "обязательно"
                                            })}
                                            type="checkbox"/><span> Я прочитал и согласен с <a
                                        href='/dogovor/UserAgreement.pdf'
                                        target={"_blank"}>условиями соглашения</a> </span>
                                        {errors.checkbox && <p className={s.error}>{errors.checkbox.message}</p>}

                                    </div>
                                    <div className={s.button_submit}>
                                        <button type={"submit"}
                                        > Обменять
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={s.info}>
                                <h2>Обмен {giveCrypto.name} на {getCrypto.name}</h2>
                                <p> Для обмена вам необходимо выполнить несколько шагов:</p>
                                <ol>
                                    <li>Заполните все поля представленной формы. Нажмите кнопку «Обменять».</li>
                                    <li>Ознакомьтесь с условиями договора на оказание услуг обмена, если вы
                                        принимаете
                                        их,
                                        поставьте галочку в соответствующем поле и нажмите кнопку «Создать
                                        заявку».
                                    </li>
                                    <li>Оплатите заявку. Для этого следует совершить перевод необходимой суммы,
                                        следуя
                                        инструкциям на нашем сайте.
                                    </li>
                                    <li>После выполнения указанных действий, система переместит Вас на страницу
                                        «Состояние
                                        заявки», где будет указан статус вашего перевода.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    </FormProvider>
                </form>
            </div>
        </div>
    );
};

export default ExchangeForm;