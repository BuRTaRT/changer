import s from './login.module.css';
import {useForm} from "react-hook-form";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../dataBase/dataBase.js";
import {useDispatch} from "react-redux";
import {dataBaseActions} from "../store/dataBaseSlice.js";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm({mode: "onBlur"})
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user;
            dispatch(dataBaseActions.setUser(user.email))
            navigate('/*')
            if (user.emailVerified) {
            }
        } catch (e) {
            alert(`Ошибка при входе ${e}`)
        }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className={s.login_header}>Вход</h2>
                    <div className={s.login_block}>
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
                            <input type={'password'}
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
                        <div className={s.btn_container}>
                            <button type={'submit'}
                                    className={s.btn}>Войти
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;