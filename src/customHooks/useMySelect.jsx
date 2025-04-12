import {useFormContext} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {cryptoActions} from "../store/cryptoSlice.js";
import s from "../components/exchangeForm.module.css";
import React from "react";


export const useMySelect = (type) => {
    const {setValue, trigger, watch} = useFormContext();
    const dispatch = useDispatch();
    const {setGetCrypto, setGiveCrypto} = cryptoActions;
    const {giveCrypto, getCrypto, cryptosList, currencies} = useSelector(state => state.cryptos)

    const options = cryptosList.map((item) => {
        return {
            value: item,
            label: (<div className={s.select_item}>
                <img src={item.image} height="40px" width="40px"/> {item.name}
            </div>)
        }
    })
    const findItem = (crypto) => {
        return options.find(item => item.value.id === crypto.id)
    }
    const filterOptions = () => {
        if (type === 'give') {
            return options.filter(option => option.value.id !== getCrypto.id)
        }
        return options.filter(option => option.value.id !== giveCrypto.id)
    }
    let filteredOptions = filterOptions();

    const defaultValue = type === 'give'
        ? findItem(giveCrypto)
        : findItem(getCrypto)


    const handleChange = (item) => {
        if (type === 'give') {
            dispatch(setGiveCrypto(item.value))
            const price = currencies[item.value.id][getCrypto.symbol];
            const giveAmount = watch('giveCryptoInput');
            setValue('getCrypto', parseFloat((giveAmount * price).toFixed(6)))
        } else {
            dispatch(setGetCrypto(item.value))
            const price = currencies[giveCrypto.id][item.value.symbol];
            const give = watch('giveCryptoInput')
            setValue('getCrypto', parseFloat((give * price).toFixed(6)))

        }
        filteredOptions = options.filter((option) => {
            return option.value.id !== item.value.id;
        })
        trigger('giveCryptoInput')
        trigger('getCrypto')
    }


    return {handleChange, filteredOptions, defaultValue}
};

