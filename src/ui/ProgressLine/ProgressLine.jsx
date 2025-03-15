import React from 'react';
import s from './progressLine.module.css'

const ProgressLine = ({stage}) => {

    return (
        <div>
            <div className={s.progress}>
                <div className={s.progress_line}>
                    <div className={stage >= 1 ? `${s.progress_steps} ${s.active}` : s.progress_steps}></div>
                    <div
                        className={stage >= 2 && stage != 200 ? `${s.progress_steps} ${s.active}` : stage == 200 ? `${s.progress_steps} ${s.error}` :s.progress_steps }></div>
                    <div
                        className={stage >= 3 && stage != 200 ? `${s.progress_steps} ${s.active}` : s.progress_steps}></div>
                    <div
                        className={stage >= 4 && stage != 200 ? `${s.progress_steps} ${s.active}` : s.progress_steps}></div>
                </div>
                <div className={s.steps_info}>
                    <div className={s.step_info}>
                        <div className={s.step_icon}>
                            <i className={stage == 1 ? `${s.active_text} fa-solid fa-download fa-2xl`
                                : `${s.default_icon_color} fa-solid fa-download fa-2xl`}></i>
                            <div className={stage == 1 ? `${s.step_text} ${s.active_text}` : s.step_text}>Ожидаем
                                поступления средств
                            </div>
                        </div>
                    </div>
                    <div className={s.step_info}>
                        <div className={s.step_icon}>
                            <i className={stage == 2 ? `${s.active_text} fa-regular fa-clock fa-2xl`
                                : stage == 200 ? `  fa-regular fa-clock fa-2xl` : `${s.default_icon_color} fa-regular fa-clock fa-2xl`}></i>
                            <div className={stage == 2 ? `${s.step_text} ${s.active_text}` : s.step_text}>{
                                stage == 200 ? <p className={s.error_color}> Ошибка сети</p> : <div className={stage == 2 ? `${s.step_text} ${s.active_text}` : s.step_text}>Ожидаем подтверждения сети</div>}
                            </div>
                        </div>
                    </div>
                    <div className={s.step_info}>
                        <div className={s.step_icon}>
                            <i className={stage == 3 ? `${s.active_text} fa-solid fa-arrow-right-arrow-left fa-2xl`
                                : `${s.default_icon_color} fa-solid fa-arrow-right-arrow-left fa-2xl`}></i>
                            <div className={stage == 3 ? `${s.step_text} ${s.active_text}` : s.step_text}>Выполняем
                                обмен
                            </div>
                        </div>
                    </div>
                    <div className={s.step_info}>
                        <div className={s.step_icon}>
                            <i className={stage == 4 ? `${s.active_text} fa - solid fa-check fa-2xl `
                                : `${s.default_icon_color} fa - solid fa-check fa-2xl `}></i>
                            <div className={stage == 4 ? `${s.step_text} ${s.active_text}` : s.step_text}>Обмен
                                Завершён
                            </div>
                        </div>
                    </div>
                </div>

                {stage==200?<p className={` ${s.active_text_error} `}>Произошла ошибка сети, обратитесть в службу технической поддержки.</p>:''}
            </div>

        </div>
    );
};

export default ProgressLine;