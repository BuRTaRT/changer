import s from './registration.module.css';
import {useForm} from "react-hook-form";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {auth} from "../dataBase/dataBase.js";
import {useState} from "react";
import classNames from "classnames";


const Registration = () => {

    
    const {
        register,
        formState: {errors},
        handleSubmit,
        watch,
        reset
    } = useForm({mode: "onBlur"})

    const onSubmit = async (data) => {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        try {
            await sendEmailVerification(user)
            reset()
        } catch (e) {
            console.log(e)
        }
    }
    const [bool, setBool] = useState(true)
    const inputType = bool ? 'password' : 'text';

    return (
        <div className='container'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className={s.registration_header}>Регистрация</h2>
                    <div className={s.registration_block}>
                        <div className={s.field}>
                            <span>Емейл:</span>
                            <input {...register('email', {
                                required: 'email обязателен',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "неверный формат емейла"
                                }
                            })}/>
                            {errors.email && <p className={s.error}>{errors.email.message}</p>}
                        </div>
                        <div className={s.field}>
                            <span>Пароль:</span>
                            <input type={inputType}
                                   {...register('password', {
                                           required: "пароль обязателен",
                                           minLength: {
                                               value: 6,
                                               message: 'минимум 6 символов'
                                           }
                                       },
                                   )}
                            />
                            {errors.password && <p className={s.error}>{errors.password.message}</p>}
                        </div>
                        <div className={s.field}>
                            <span>Подтверждение пароля:</span>
                            <input type={inputType}
                                   {...register('confirm-password', {
                                           required: "пароль обязателен",
                                           validate: (val) => {
                                               if (watch('password') !== val) {
                                                   return 'пароли не совпадают'
                                               }
                                           }
                                       },
                                   )}
                            />

                            {errors['confirm-password'] &&
                                <p className={classNames(s.error, s.lastError)}>{errors['confirm-password'].message}</p>}
                            <div className={s.checkbox}>
                                <label>
                                    <input className={s.check} onClick={() => setBool(val => !val)}
                                           type="checkbox"/>
                                    <span>показать пароль</span>
                                </label>

                            </div>
                        </div>
                        <div className={s.btn_container}>
                            <button type={'submit'}
                                    className={s.btn}>Зарегистрироваться
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Registration;