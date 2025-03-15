import './App.css'
import Header from "./layout/Header.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import ExchangeForm from "./components/ExchangeForm.jsx";
import Operation from "./pages/Operation.jsx";
import MyApplications from "./pages/MyApplications/MyApplications.jsx";
import Footer from "./layout/Footer.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import {useEffect} from "react";
import {getCurrencies} from "./store/cryptoSlice.js";
import {useDispatch, useSelector} from "react-redux";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/LogIn.jsx";
import Unconfirmed from "./components/Unconfirmed.jsx";
import {setAuthorized} from "./store/dataBaseSlice.js";
import Reviews from "./pages/Reviews/Reviews.jsx";

function App() {
    const dispatch = useDispatch();
    const {user, emailVerified} = useSelector(state => state.dataBase)

    useEffect(() => {
        dispatch(getCurrencies())
        dispatch(setAuthorized())
    }, [])
    return (
        <div className={'App'}>
            {user && !emailVerified && <Unconfirmed/>}
            <Header/>
            <Routes>
                <Route path='*' element={<Home/>}/>
                <Route path='/exchangeForm' element={<ExchangeForm/>}/>
                <Route path='/operation' element={<Operation/>}/>
                <Route path='/MyApplications' element={<MyApplications/>}/>
                <Route path='/about_us' element={<AboutUs/>}/>
                <Route path='/signIn' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/reviews' element={<Reviews/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}

export default App
