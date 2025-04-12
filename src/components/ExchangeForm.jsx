import {useSelector} from "react-redux";
import s from './exchangeForm.module.css'
import {FormProvider, useForm} from "react-hook-form";
import {startOperation} from "../store/dataBaseSlice.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Loader from "../ui/Loader/Loader.jsx";
import inputFormatValue from "../helpers/inputFormatValue.js";
import MySelect from "./mySelect.jsx";

const ExchangeForm = () => {
    const [isFetching, setIsFetching] = useState(false);
    const user = useSelector(state => state.dataBase.user);
    const nav = useNavigate();
    const {
        currencies,
        reserve,
        giveCrypto,
        getCrypto,
        minSum,
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
    } = useForm({mode: "onBlur"})

    const methods = {
        watch, setValue, trigger, control,
    }

    const giveInputHandler = (e) => {
        const formattedValue = inputFormatValue(e)
        setValue('giveCryptoInput', formattedValue);
        if (formattedValue !== '') {
            const numValue = parseFloat(formattedValue);
            const getCryptoValue = (numValue * price).toFixed(6);
            setValue('getCrypto', getCryptoValue);
        } else {
            setValue('getCrypto', '');
        }
        trigger('getCrypto')
        trigger('giveCryptoInput')
    };

    const getInputHandler = (e) => {
        const formattedValue = inputFormatValue(e)
        setValue('getCrypto', formattedValue);
        if (formattedValue !== '') {
            const numValue = parseFloat(formattedValue);
            const giveCryptoValue = (numValue / price).toFixed(6);
            setValue('giveCryptoInput', giveCryptoValue);
        } else {
            setValue('giveCryptoInput', '');
        }
        trigger('getCrypto')
        trigger('giveCryptoInput')
    };

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
                                    <FormProvider {...methods}>
                                        <MySelect
                                            type={'give'}
                                            name={"giveCryptoSelect"}
                                        />
                                    </FormProvider>
                                    <div className={s.sum}>
                                        <div className={s.sum_text}>сумма<span className={s.star}>*</span>:
                                        </div>
                                        <div className={s.input_container}>
                                            <input {...register('giveCryptoInput', {
                                                required: "Поле обязательно",
                                                validate: {
                                                    isNumber: value => !isNaN(value) || 'Должно быть числом',
                                                    min: (value) => {
                                                        const giveSelect = watch('giveCryptoSelect')
                                                        return value > minSum[giveSelect.value.id] || `Минимальная сумма ${minSum[giveSelect.value.id]}`
                                                    },

                                                }
                                            })}
                                                   onChange={giveInputHandler}
                                                   placeholder='0'
                                            />
                                            {errors.giveCrypto &&
                                                <p className={s.error}>{errors.giveCrypto.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <hr className={s.hr}/>
                                <h2>Получаете</h2>
                                <div className={s.get}>
                                    <FormProvider {...methods}>
                                        <MySelect
                                            name={"getCryptoSelect"}
                                        />
                                    </FormProvider>
                                    <div className={s.sum}>
                                        <div className={s.sum_text}>сумма<span className={s.star}>*</span>:
                                        </div>
                                        <div className={s.input_container}>
                                            <input {...register('getCrypto', {
                                                required: 'Обязательно',
                                                validate: {
                                                    maxValue: value => {
                                                        const getSelect = watch("getCryptoSelect")
                                                        return value < reserve[getSelect.value.id] || `в резерве ${reserve[getSelect.value.id]}`
                                                    },
                                                    isNumber: value => !isNaN(value) || 'Должно быть числом',
                                                    minValue: value => value > 0.00001 || 'должно быть > 0',
                                                }

                                            })}
                                                   onChange={getInputHandler}
                                                   placeholder='0'
                                            />
                                            {errors.getCrypto && <p className={s.error}>{errors.getCrypto.message}</p>}
                                        </div>

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
                                                       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                </form>
            </div>
        </div>
    );
};

export default ExchangeForm;