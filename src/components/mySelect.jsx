import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import Select from "react-select";
import s from "./exchangeForm.module.css";
import {useMySelect} from "../customHooks/useMySelect";

const MySelect = ({name, type}) => {
    const {control} = useFormContext()
    const {handleChange, filteredOptions, defaultValue} = useMySelect(type);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue} // Важно: указываем дефолт явно
            render={({field}) => (
                <Select
                    {...field} // обязательно — включает onChange, value, name
                    options={filteredOptions}
                    className={s.give_select}
                    getOptionValue={option => option.value.id}
                    onChange={(selectedOption) => {
                        field.onChange(selectedOption);       // передаём в react-hook-form
                        handleChange(selectedOption);    // вызываем твою логику
                    }}
                />
            )}
        />
    );
};

export default MySelect;