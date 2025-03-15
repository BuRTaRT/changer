import {configureStore} from "@reduxjs/toolkit";
import cryptoSlice from "./cryptoSlice.js";
import dataBaseSlice from "./dataBaseSlice.js";


const store = configureStore({
    reducer: {
        cryptos: cryptoSlice,
        dataBase: dataBaseSlice
    }
})

export default store;
