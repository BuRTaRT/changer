import React from 'react';
import {useFormContext} from "react-hook-form";
import {useSelector} from "react-redux";
import s from "../components/exchangeForm.module.css";
import inputFormatValue from "../helpers/inputFormatValue.js";

const useMyInput = (type) => {
    const {setValue, trigger, watch, errors} = useFormContext()
    const {currencies, giveCrypto, getCrypto, minSum, reserve} = useSelector(state => state.cryptos);
    const validate = {
        get: {
            maxValue: value => {
                const getSelect = watch("getCryptoSelect")
                return value < reserve[getSelect.value.id] || `в резерве ${reserve[getSelect.value.id]}`
            },
            minValue: value => value > 0.00001 || 'должно быть > 0',
        },
        give: {
            isNumber: value => !isNaN(value) || 'Должно быть числом',
            min: (value) => {
                const giveSelect = watch('giveCryptoSelect');
                return value > minSum[giveSelect.value.id] || `Минимальная сумма ${minSum[giveSelect.value.id]}`
            },

        }
    }
    const error = {
        give: errors.giveCryptoInput && <p className={s.error}>{errors.giveCryptoInput.message}</p>,
        get: errors.getCrypto && <p className={s.error}>{errors.getCrypto.message}</p>
    }
    const inputHandler = (e) => {
        const price = currencies && parseFloat(currencies[giveCrypto.id][getCrypto.symbol])
        const formattedValue = inputFormatValue(e);
        if (type === 'give') {
            if (formattedValue !== '') {
                const numValue = parseFloat(formattedValue);
                const value = (numValue * price).toFixed(6);
                setValue('getCrypto', value);
            } else {
                setValue('getCrypto', '');
            }
            trigger(['giveCryptoInput','getCrypto'])
        } else if (type === 'get') {
            if (formattedValue !== '') {
                const numValue = parseFloat(formattedValue);
                const value = (numValue / price).toFixed(6);
                setValue('giveCryptoInput', value);
            } else {
                setValue('giveCryptoInput', '');
            }
            trigger(['giveCryptoInput','getCrypto'])
        }


    }
    return {inputHandler, validate, error}

};

export default useMyInput;