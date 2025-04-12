import React, {memo} from 'react';
import s from "./exchangeForm.module.css";
import useMyInput from "../customHooks/useMyInput";
import {useFormContext} from "react-hook-form";

const MyInput = ({type, name}) => {
    const {register} = useFormContext()
    const {error, validate, inputHandler} = useMyInput(type);
    return (
        <div className={s.input_container}>
            <input {...register(name, {
                required: "Поле обязательно",
                validate: type === 'give' ? validate.give : validate.get
            })}
                   onChange={(e)=>{
                       register(name).onChange(e)
                       inputHandler(e)
                   }}
                   placeholder='0'
            />
            {type === 'give' ? error.give : error.get}
        </div>
    );
};

export default memo(MyInput)