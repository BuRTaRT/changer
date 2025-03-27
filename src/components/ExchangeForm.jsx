import {useDispatch, useSelector} from "react-redux";
import s from './exchangeForm.module.css'
import Select from "react-select";
import {cryptoActions} from "../store/cryptoSlice.js";
import {useForm} from "react-hook-form";
import {startOperation} from "../store/dataBaseSlice.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Loader from "../ui/Loader/Loader.jsx";
import inputFormatValue from "../helpers/inputFormatValue.js";

const ExchangeForm = () => {
    const [isFetching, setIsFetching] = useState(false);
    const user = useSelector(state => state.dataBase.user)
    const nav = useNavigate();
    const {
        cryptosList: list,
        currencies,
        reserve,
        giveCrypto,
        getCrypto,
        minSum,
        regEx,
    } = useSelector((state) => state.cryptos);
    const dispatch = useDispatch();
    const {setGetCrypto, setGiveCrypto} = cryptoActions;
    let price = currencies && parseFloat(currencies[giveCrypto.id][getCrypto.symbol])
    if (getCrypto.id === giveCrypto.id) {
        price = 1;
    }
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        watch,
        trigger
    } = useForm({mode: "onBlur"})


    const giveInputHandler = (e) => {
        const formattedValue = inputFormatValue(e)
        setValue('giveCrypto', formattedValue);
        if (formattedValue !== '') {
            const numValue = parseFloat(formattedValue);
            const getCryptoValue = (numValue * price).toFixed(6);
            setValue('getCrypto', getCryptoValue);
        } else {
            setValue('getCrypto', '');
        }
        trigger('getCrypto')
        trigger('giveCrypto')
    };

    const getInputHandler = (e) => {
        const formattedValue = inputFormatValue(e)
        setValue('getCrypto', formattedValue);
        if (formattedValue !== '') {
            const numValue = parseFloat(formattedValue);
            const giveCryptoValue = (numValue / price).toFixed(6);
            setValue('giveCrypto', giveCryptoValue);
        } else {
            setValue('giveCrypto', '');
        }
        trigger('getCrypto')
        trigger('giveCrypto')
    };


    const options = list.map((item) => {
        return {
            value: item,
            label: <div className={s.select_item}><img src={item.image} height="40px" width="40px"/> {item.name} </div>
        }
    })
    const defaultSelectGetValue = options.find(item => item.value.id === getCrypto.id)
    const defaultSelectGiveValue = options.find(item => item.value.id === giveCrypto.id)


    let getOptions = options.filter((option) => {
        return option.value.id !== defaultSelectGiveValue.value.id

    })
    let giveOptions = options.filter((option) => {
        return option.value.id !== defaultSelectGetValue.value.id;


    })

    let localGiveCrypto = giveCrypto;
    const giveSelectHandler = (item) => {
        dispatch(setGiveCrypto(item.value))
        localGiveCrypto = item.value;
        getOptions = options.filter((option) => {
            return option.value.id !== item.value.id;
        })
        const give = watch('giveCrypto')
        const price = currencies[item.value.id][getCrypto.symbol];
        setValue('getCrypto', parseFloat((give * price).toFixed(6)))
        trigger('giveCrypto').catch(() => {
        })
        trigger('getCrypto').catch(() => {
        })
    }
    let localGetCrypto = getCrypto;
    const getSelectHandler = (item) => {
        dispatch(setGetCrypto(item.value))
        localGetCrypto = item.value;
        giveOptions = options.filter((option) => {
            return option.value.id !== item.value.id;
        })
        const price = currencies[giveCrypto.id][item.value.symbol];
        const give = watch('giveCrypto')
        console.log(watch('getSelect'))
        setValue('getCrypto', parseFloat((give * price).toFixed(6)))
        trigger('giveCrypto').catch(() => {
        })
        trigger('getCrypto').catch(() => {
        })
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
                                    <Select className={s.give_select}
                                            onChange={giveSelectHandler}
                                            defaultValue={defaultSelectGiveValue}
                                            options={giveOptions}
                                    />
                                    <div className={s.sum}>
                                        <div className={s.sum_text}>сумма<span className={s.star}>*</span>:
                                        </div>
                                        <div className={s.input_container}>
                                            <input {...register('giveCrypto', {
                                                required: "Поле обязательно",
                                                validate: {
                                                    isNumber: value => !isNaN(value) || 'Должно быть числом',
                                                    min: value => value > minSum[localGiveCrypto.id] || `Минимальная сумма ${minSum[localGiveCrypto.id]}`,

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
                                    <Select className={s.get_select}
                                            defaultValue={defaultSelectGetValue}
                                            options={getOptions}
                                            onChange={getSelectHandler}
                                    />

                                    <div className={s.sum}>
                                        <div className={s.sum_text}>сумма<span className={s.star}>*</span>:
                                        </div>
                                        <div className={s.input_container}>
                                            <input {...register('getCrypto', {
                                                required: 'Обязательно',
                                                validate: {
                                                    maxValue: value => value < reserve[localGetCrypto.id] || `в резерве ${reserve[localGetCrypto.id]}`,
                                                    isNumber: value => !isNaN(value) || 'Должно быть числом',
                                                    minValue: value => value > 0.00001 ||  '>0',
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