import {createSlice} from "@reduxjs/toolkit";
import {auth, database} from "../dataBase/dataBase.js";
import {ref, get, push, set, onValue, update, remove} from "firebase/database";
import {randomInteger} from "../helpers/randomInteger.js";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {onAuthStateChanged, signOut} from "firebase/auth";
import objectToArray from "../helpers/objectToArray.js";
import ObjectToArray from "../helpers/objectToArray.js";

dayjs.locale('ru');

const dataBaseSlice = createSlice({
    name: 'dataBase',
    initialState: {
        isAuth: false,
        user: null,
        emailVerified: false,
        transactions: [],
        giveCrypto: null,
        getCrypto: null,
        operation: null,
        stage: null,
        date: null,
        operationNumber: null

    },
    reducers: {
        setOperationData(state, action) {
            state.giveCrypto = action.payload.giveCrypto;
            state.getCrypto = action.payload.getCrypto;
            state.stage = action.payload.stage
            state.date = action.payload.date
            state.operationNumber = action.payload.n

        },
        setUser(state, action) {
            state.user = action.payload
        },
        logOut(state) {
            state.user = null;
        },
        setEmailVerified(state, action) {
            state.emailVerified = action.payload;
        },
        setTransactions(state, action) {
            if (state.user) {
                state.transactions = ObjectToArray(action.payload).filter(transaction => transaction.email === state.user).reverse()
            } else if (localStorage.ids) {
                const ids = JSON.parse(localStorage.ids)
                state.transactions = [];
                for (let id of ids) {
                    const transaction = objectToArray(action.payload).find(transaction => transaction.id === id)
                    if (!state.transactions.find(item => item.id === transaction.id)) {
                        state.transactions.push(transaction)
                    }
                }
            } else {
                state.transactions = []
            }
        }
    }
})

export const startOperation = async (giveCrypto, getCrypto, wallet, email, user) => {
    const dbNumRef = ref(database, 'number');
    const dbTransactionsRef = ref(database, 'transactions/');
    const n = await get(dbNumRef);
    const withId = push(dbTransactionsRef);
    const newNumber = n.val() + randomInteger(1, 8);
    await set(withId, {
        giveCrypto,
        getCrypto,
        wallet,
        n: n.val(),
        email,
        stage: 0,
        date: {
            date: dayjs().format('D MMMM YYYY г., H:mm'),
            dateStart: dayjs().format(),
            dateExpires: (() => {
                let expires = dayjs();
                return expires.add(30, 'minute').format();
            })()
        }
    })
    await set(dbNumRef, newNumber)
    // if (user) {
    //     localStorage.current = withId.key;
    //     let arr = JSON.parse(localStorage.ids)
    //     arr.unshift(withId.key);
    //     localStorage.ids = JSON.stringify(arr);
    // }
    if (!localStorage.ids) {
        const newArray = [];
        newArray.push(withId.key)
        localStorage.ids = JSON.stringify(newArray)
        localStorage.current = withId.key;
    } else {
        localStorage.current = withId.key;
        let arr = JSON.parse(localStorage.ids)
        arr.unshift(withId.key);
        localStorage.ids = JSON.stringify(arr);
    }
}
export const startProcess = async () => {
    const dbTransactionRef = ref(database, 'transactions/' + localStorage.current);
    const updates = {
        stage: 1
    }
    await update(dbTransactionRef, updates)
}
export const stopProcess = async () => {
    const dbTransactionRef = ref(database, 'transactions/' + localStorage.current);
    localStorage.ids = JSON.stringify(JSON.parse(localStorage.ids).filter(id => id !== localStorage.current))
    await remove(dbTransactionRef);
}

export const getDatas = (isFetched) => async (dispatch) => {
    console.log('getDatas')
    const dbTransactionRef = ref(database, 'transactions');
    const snapshot = await get(dbTransactionRef);
    dispatch(dataBaseActions.setTransactions(snapshot.val()))
    if (isFetched) {
        isFetched(false)
    }
}
export const getData = (fetchCompleted) => async (dispatch) => {
    const dbTransactionRef = ref(database, 'transactions/' + localStorage.current);
    onValue(dbTransactionRef, (snapshot) => {
        if (snapshot.val()) {
            const {giveCrypto, getCrypto, date, stage, n} = snapshot.val();
            dispatch(dataBaseActions.setOperationData({giveCrypto, getCrypto, date, stage, n}))
        }

    })
    const snapshot = await get(dbTransactionRef);
    const {giveCrypto, getCrypto, date, stage, n} = snapshot.val();
    dispatch(dataBaseActions.setOperationData({giveCrypto, getCrypto, date, stage, n}))
    fetchCompleted()
}

export const setAuthorized = () => async (dispatch) => {
     onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(dataBaseActions.setUser(user.email))
            dispatch(dataBaseActions.setEmailVerified(user.emailVerified))
        }
        if (user && !user.emailVerified) {
            let timer = setInterval(async () => {
                await user.reload()
                if (user.emailVerified) {
                    dispatch(dataBaseActions.setEmailVerified(user.emailVerified))
                    clearInterval(timer)
                }
            }, 5000)
        }
    })
}
export let logOff = () => async (dispatch) => {
    await signOut(auth);
    dispatch(dataBaseActions.logOut())
}


export const dataBaseActions = dataBaseSlice.actions;

export default dataBaseSlice.reducer;
