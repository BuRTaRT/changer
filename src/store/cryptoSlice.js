import {createSlice} from "@reduxjs/toolkit";
import {get, ref} from "firebase/database";
import {database} from "../dataBase/dataBase.js";


const cryptoSlice = createSlice({
    name: 'cryptos',
    initialState: {
        cryptosList: [
            {

                "id": "bitcoin",
                "symbol": "btc",
                "name": "Bitcoin",
                "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
            },
            {
                "id": "ethereum",
                "symbol": "eth",
                "name": "Ethereum",
                "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",

            },
            {
                "id": "litecoin",
                "symbol": "ltc",
                "name": "Litecoin",
                "image": "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580"
            },
            {
                "id": "solana",
                "symbol": "sol",
                "name": "Solana",
                "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422"
            },
            {
                "id": "polkadot",
                "symbol": "dot",
                "name": "Polkadot",
                "image": "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1639712644"
            },
            {
                "id": "tron",
                "symbol": "trx",
                "name": "TRON",
                "image": "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066"
            },
            {
                "id": "cosmos",
                "symbol": "atom",
                "name": "Cosmos Hub",
                "image": "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1555657960"
            },
            {
                "id": "tezos",
                "symbol": "xtz",
                "name": "Tezos",
                "image": "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1547034862"
            },
            {
                "id": "cardano",
                "symbol": "ada",
                "name": "Cardano",
                "image": "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860"
            },
            {
                "id": "tether",
                "symbol": "usdt",
                "name": "Tether",
                "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663"
            },
            {
                "id": "ripple",
                "symbol": "xrp",
                "name": "XRP",
                "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731"
            },
            {
                "id": "dogecoin",
                "symbol": "doge",
                "name": "Dogecoin",
                "image": "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256"
            },
            {
                "id": "binancecoin",
                "symbol": "bnb",
                "name": "BNB",
                "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850"
            }
        ],
        reserve: {
            "ethereum": 36.118,
            "bitcoin": 2.61312,
            "litecoin": 70.167,
            "solana": 932.871,
            "polkadot": 2277.03984,
            'cosmos': 1066.761,
            'tron': 102860,
            'tezos': 14925.613,
            'cardano': 11088.921,
            'tether': 27944,
            'ripple': 6622,
            'dogecoin': 42263,
            'binancecoin': 32.734
        },
        currencies: null,
        giveCrypto: {
            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        },
        getCrypto: {
            "id": "litecoin",
            "symbol": "ltc",
            "name": "Litecoin",
            "image": "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580"
        },
        minSum: {
            bitcoin: 0.000038,
            ethereum: 0.050,
            tether: 90.11,
            dogecoin: 1272.24,
            ripple: 199.27,
            cardano: 251.55,
            tron: 1159.98,
            litecoin: 1.06,
            cosmos: 8.563,
            tezos: 102,
            polkadot: 17.11,
            solana: 4.1,
            binancecoin: 0.295
        },
        regEx: {
            bitcoin: '^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$',
            ethereum: '^0x[a-fA-F0-9]{40}$',
            litecoin: '^(L|M|ltc1)[a-zA-HJ-NP-Z0-9]{26,39}$',
            solana: '^[1-9A-HJ-NP-Za-km-z]{32,44}$',
            ripple: '^r[0-9a-zA-Z]{24,34}$',
            cosmos: '^cosmos1[a-z0-9]{38}$',
            binancecoin: '^bnb1[0-9a-z]{38}$',
            cardano: '^addr1[a-z0-9]{58}$',
            dogecoin: '^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$',
            tezos: '^(tz1|tz2|tz3|KT1)[a-zA-Z0-9]{33}$',
            tros: '^T[1-9A-HJ-NP-Za-km-z]{33}$',
            tether: '^0x[a-fA-F0-9]{40}$', // для Ethereum (ERC-20)
            polkadot: '^1[a-zA-HJ-NP-Z0-9]{47}$'
        },
        wallets: {
            bitcoin: 'bc1qwwakwwh6z3c5sprrj276jvpxv24ectkq4hpv9k',
            ethereum: '0x92C74B82A944b1EA165FeCC43726f85Dcb1ef159',
            tether: '0x92C74B82A944b1EA165FeCC43726f85Dcb1ef159',
            dogecoin: "DSutzjyXqif9TpFrzCWZewihdgGe87c79K",
            ripple: 'rHpYK8pbpVfuQuQvB5jt1mETKQJQSpCosJ',
            cardano: 'addr1qxg9ns8pmm7k70uxqfv55dc34u5rtd4k0ghpv4zc6lzsmjust8qwrhhadulcvqjefgm3rtegxkmtv73wze293479ph9syh07xp',
            tron: 'TLkhQeURfTWmC5pYWQhk2CNKMyCP5KckiC',
            litecoin: 'LMcVEHZXy5Mpoi6LbA7motH8igRp7j8W9D',
            cosmos: 'cosmos134khr4ug90lzgjg6ngaevp7w8szakm7uke9cpu',
            tezos: 'tz1KrMM8wXPVjFwNTEX4Jfuv7yMxk8Eu77LQ',
            polkadot: '15bUg6rvgKAEAP3WHz3e3P2NC6ZGsrVLnxcH9qiQgWxgxScj',
            solana: 'HRREAfaABWUi67MiYNxwDAN9m5XMRavFSVAWx4E847jg',
            binancecoin: '0x92C74B82A944b1EA165FeCC43726f85Dcb1ef159'
        }
    },
    reducers: {
        setGiveCrypto(state, action) {
            state.giveCrypto = action.payload
        },
        setGetCrypto(state, action) {
            state.getCrypto = action.payload

        },
        setCurrencies(state, action) {
            state.currencies = action.payload
        }

    }
})

export const getCurrencies = () => async (dispatch) => {
    const dbRef = ref(database, 'currencies')
    const snapshot = await get(dbRef);
    dispatch(cryptoActions.setCurrencies(snapshot.val()))


}

export const cryptoActions = cryptoSlice.actions;
export default cryptoSlice.reducer;
