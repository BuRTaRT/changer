import s from './operation.module.css'
import {useEffect, useState} from "react";
import {getData} from "../store/dataBaseSlice.js";
import {useDispatch, useSelector} from "react-redux";
import WaitStage from "./WaitStage.jsx";
import ProcessStage from "./ProcessStage.jsx";
import * as SVGLoaders from "svg-loaders-react";

const Operation = () => {
    let [isFetching, setFetching] = useState(true);
    const stage = useSelector((state) => state.dataBase.stage)
    const dispatch = useDispatch();
    window.location="#top"

    const setIsFetchingHandler = () => {
        setFetching(false)
    }


    useEffect(() => {
        dispatch(getData(setIsFetchingHandler))
    }, [])

    return (
        <div id={'top'} className={'container'}>
            <div className={s.operation_wrapper}>
                {isFetching ? <SVGLoaders.Oval width={'60px'} stroke="#278DF9"/>
                    : stage === 0 ? <WaitStage/>
                        : stage >= 1 ? <ProcessStage/> : null}
            </div>
        </div>
    );
};

export default Operation;